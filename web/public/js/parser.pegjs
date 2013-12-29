{
  function annotate(obj) {
    obj.source = {
      line: line(),
      column: column(),
      text: text()
    };
    return obj;
  }

  function toInt(o) {
    return parseInt(o, 10);
  }
}

start = block

block = commands:(ws (comment ws)* ws command:command ws (comment ws)* ws { return command; })*
  { return new $t.Block(commands); }

command
  = pushInt
  / pushChar
  / add
  / subtract
  / multiply
  / quotient
  / negate
  / equal
  / greater
  / and
  / or
  / not
  / duplicate
  / delete
  / swap
  / rotate
  / pick
  / putInt
  / putChar
  / putString
  / getChar
  / varAssign
  / varRead
  / pushSubroutine
  / runSubroutine
  / if
  / while
  / random
  / flush
  / assembly

ws = [ \r\n\t]*

add = '+'
  { return annotate(new $t.Add()); }

subtract = '-'
  { return annotate(new $t.Subtract()); }

multiply = '*'
  { return annotate(new $t.Multiply()); }

quotient = '/'
  { return annotate(new $t.Quotient()); }

negate = '_'
  { return annotate(new $t.Negate()); }

equal = '='
  { return annotate(new $t.Equal()); }

greater = '>'
  { return annotate(new $t.Greater()); }

and = '&'
  { return annotate(new $t.And()); }

or = '|'
  { return annotate(new $t.Or()); }

not = '~'
  { return annotate(new $t.Not()); }

duplicate = '$'
  { return annotate(new $t.Duplicate()); }

delete = '%'
  { return annotate(new $t.Delete()); }

swap = '\\'
  { return annotate(new $t.Swap()); }

rotate = '@'
  { return annotate(new $t.Rotate()); }

pick = 'ø'
  { return annotate(new $t.Pick()); }

putInt = '.'
 { return annotate(new $t.PutInt()); }

putChar = ','
  { return annotate(new $t.PutChar()); }

putString = '"' quote:([^"]*) '"'
  { return annotate(new $t.PutString(quote.join(""))); }

getChar = '^'
  { return annotate(new $t.GetChar()); }

pushInt = [0-9]+
  { return annotate(new $t.PushInt(toInt(text()))); }

pushChar = "'" char:.
  { return annotate(new $t.PushChar(char)); }

varAssign = name:varName ws ':' ws
  { return annotate(new $t.AssignVar(name)); }

varRead = name:varName ws ';' ws
  { return annotate(new $t.ReadVar(name)); }

varName = [A-Za-z]+
  { return text(); }

pushSubroutine = '[' block:block ']'
  { return annotate(new $t.PushSubroutine(block)); }

runSubroutine = '!'
  { return annotate(new $t.RunSubroutine()); }

if = '?'
  { return annotate(new $t.If()); }

while = '#'
  { return annotate(new $t.While()); }

random = '\u2206'
  { return annotate(new $t.Random()); }

flush = 'ß'
  { return annotate(new $t.Flush()); }

assembly = [0-9]+ '`'
  { return annotate(new $t.Assembly()); }

comment = '{' [^}]* '}'
