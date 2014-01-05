%{
  var string = '';
%}

%lex

%options ranges

%x comment
%x string

%%

<INITIAL>\{           this.begin('comment');
<comment>[^}]+\}      this.popState();

<INITIAL>\"           this.begin('string'); string = '';
<string>\\\"          string += '"';
<string>\\\\          string += '\\';
<string>\\r           string += '\r';
<string>\\n           string += '\n';
<string>\\t           string += '\t';
<string>\"            %{
                        this.popState();
                        yytext = string;
                        return 'STRING_LITERAL';
                      %}
<string>.|\n          string += yytext;

[A-Za-z]+             return 'VAR';
\s+                   /* Skip whitespace. */
\'\\\\                yytext = '\\'; return 'CHAR_LITERAL';
\'\\r                 yytext = '\r'; return 'CHAR_LITERAL';
\'\\n                 yytext = '\n'; return 'CHAR_LITERAL';
\'\\t                 yytext = '\t'; return 'CHAR_LITERAL';
\'(.|\n)              yytext = yytext[1]; return 'CHAR_LITERAL';
[0-9]+                return 'INT_LITERAL';
<<EOF>>               return 'EOF';
.                     return yytext[0];

/lex

%start program

%%

program: opt_block EOF
  { return new $t.Program($1); };

opt_block
  : block
  | /* Empty. */
    { $$ = annotate(new $t.Block([]), @$); }
  ;

block
  : block command
    { $1.commands.push($2); }
  | command
    { $$ = annotate(new $t.Block([$1]), @$); }
  ;

command
  : pushInt
  | pushChar
  | add
  | subtract
  | multiply
  | quotient
  | negate
  | equal
  | greater
  | and
  | or
  | not
  | duplicate
  | delete
  | swap
  | rotate
  | pick
  | putInt
  | putChar
  | putString
  | getChar
  | pushSubroutine
  | runSubroutine
  | if
  | while
  | flush
  | varAssign
  | varRead
  | random
  ;

pushInt: INT_LITERAL
  { $$ = annotate(new $t.PushInt(toInt($1)), @$); };

pushChar: CHAR_LITERAL
  { $$ = annotate(new $t.PushChar($1), @$); };

add: '+'
  { $$ = annotate(new $t.Add(), @$); };

subtract: '-'
  { $$ = annotate(new $t.Subtract(), @$); };

multiply: '*'
  { $$ = annotate(new $t.Multiply(), @$); };

quotient: '/'
  { $$ = annotate(new $t.Quotient(), @$); };

negate: '_'
  { $$ = annotate(new $t.Negate(), @$); };

equal: '='
  { $$ = annotate(new $t.Equal(), @$); };

greater: '>'
  { $$ = annotate(new $t.Greater(), @$); };

and: '&'
  { $$ = annotate(new $t.And(), @$); };

or: '|'
  { $$ = annotate(new $t.Or(), @$); };

not: '~'
  { $$ = annotate(new $t.Not(), @$); };

duplicate: '$'
  { $$ = annotate(new $t.Duplicate(), @$); };

delete: '%'
  { $$ = annotate(new $t.Delete(), @$); };

swap: '\'
  { $$ = annotate(new $t.Swap(), @$); };

rotate: '@'
  { $$ = annotate(new $t.Rotate(), @$); };

pick: 'ø'
  { $$ = annotate(new $t.Pick(), @$); };

putInt: '.'
  { $$ = annotate(new $t.PutInt(), @$); };

putChar: ','
  { $$ = annotate(new $t.PutChar(), @$); };

putString: STRING_LITERAL
  { $$ = annotate(new $t.PutString($1), @$); };

getChar: '^'
  { $$ = annotate(new $t.GetChar(), @$); };

pushSubroutine: '[' opt_block ']'
  { $$ = annotate(new $t.PushSubroutine($2), @$); }; 

runSubroutine: '!'
  { $$ = annotate(new $t.RunSubroutine(), @$); };

if: '?'
  { $$ = annotate(new $t.If(), @$); };

while: '#'
  { $$ = annotate(new $t.While(), @$); };

flush: 'ß'
  { $$ = annotate(new $t.Flush(), @$); };

varAssign: VAR ':'
  { $$ = annotate(new $t.AssignVar($1), @$); };

varRead: VAR ';'
  { $$ = annotate(new $t.ReadVar($1), @$); };

random: '∆'
  { $$ = annotate(new $t.Random(), @$); };

%%

function toInt(o) {
  return parseInt(o, 10);
}

function annotate(obj, loc) {
  // 0-based inclusive row/column numbers.
  obj.source = {
    row: {
      start: loc.first_line - 1,
      end: loc.last_line - 1
    },
    column: {
      start: loc.first_column,
      end: loc.last_column - 1
    },
    start: loc.range[0],
    end: loc.range[1]
  };
  return obj;
}
