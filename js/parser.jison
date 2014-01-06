%lex

%options ranges

%x comment
%x string

%%

<INITIAL>\{           this.begin('comment');
<comment>[^}]+\}      this.popState();

<INITIAL>\"           %{
                        this.begin('string');
                        string = '';
                        firstLine = yylloc.first_line;
                        firstColumn = yylloc.first_column;
                        rangeStart = yylloc.range[0];
                      %}
<string>\\\"          string += '"';
<string>\\\\          string += '\\';
<string>\\r           string += '\r';
<string>\\n           string += '\n';
<string>\\t           string += '\t';
<string>\"            %{
                        this.popState();
                        yylloc = {
                          first_line: firstLine,
                          last_line: yylloc.last_line,
                          first_column: firstColumn,
                          last_column: yylloc.last_column,
                          range: [rangeStart, yylloc.range[1]]
                        };
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
  { return new yy.Program($1); };

opt_block
  : block
  | /* Empty. */
    { $$ = yy.annotate(new yy.Block([]), @$); }
  ;

block
  : block command
    { $1.commands.push($2); }
  | command
    { $$ = yy.annotate(new yy.Block([$1]), @$); }
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
  | break
  ;

pushInt: INT_LITERAL
  { $$ = yy.annotate(new yy.PushInt(Number($1)), @$); };

pushChar: CHAR_LITERAL
  { $$ = yy.annotate(new yy.PushChar($1), @$); };

add: '+'
  { $$ = yy.annotate(new yy.Add(), @$); };

subtract: '-'
  { $$ = yy.annotate(new yy.Subtract(), @$); };

multiply: '*'
  { $$ = yy.annotate(new yy.Multiply(), @$); };

quotient: '/'
  { $$ = yy.annotate(new yy.Quotient(), @$); };

negate: '_'
  { $$ = yy.annotate(new yy.Negate(), @$); };

equal: '='
  { $$ = yy.annotate(new yy.Equal(), @$); };

greater: '>'
  { $$ = yy.annotate(new yy.Greater(), @$); };

and: '&'
  { $$ = yy.annotate(new yy.And(), @$); };

or: '|'
  { $$ = yy.annotate(new yy.Or(), @$); };

not: '~'
  { $$ = yy.annotate(new yy.Not(), @$); };

duplicate: '$'
  { $$ = yy.annotate(new yy.Duplicate(), @$); };

delete: '%'
  { $$ = yy.annotate(new yy.Delete(), @$); };

swap: '\'
  { $$ = yy.annotate(new yy.Swap(), @$); };

rotate: '@'
  { $$ = yy.annotate(new yy.Rotate(), @$); };

pick: 'ø'
  { $$ = yy.annotate(new yy.Pick(), @$); };

putInt: '.'
  { $$ = yy.annotate(new yy.PutInt(), @$); };

putChar: ','
  { $$ = yy.annotate(new yy.PutChar(), @$); };

putString: STRING_LITERAL
  { $$ = yy.annotate(new yy.PutString($1), @$); };

getChar: '^'
  { $$ = yy.annotate(new yy.GetChar(), @$); };

pushSubroutine: '[' opt_block ']'
  { $$ = yy.annotate(new yy.PushSubroutine($2), @$); }; 

runSubroutine: '!'
  { $$ = yy.annotate(new yy.RunSubroutine(), @$); };

if: '?'
  { $$ = yy.annotate(new yy.If(), @$); };

while: '#'
  { $$ = yy.annotate(new yy.While(), @$); };

flush: 'ß'
  { $$ = yy.annotate(new yy.Flush(), @$); };

varAssign: VAR ':'
  { $$ = yy.annotate(new yy.AssignVar($1), @$); };

varRead: VAR ';'
  { $$ = yy.annotate(new yy.ReadVar($1), @$); };

random: '∆'
  { $$ = yy.annotate(new yy.Random(), @$); };

break: '`'
  { $$ = yy.annotate(new yy.Break(), @$); };

%%
