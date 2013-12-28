{
  var t = require('./true.js');

  function toInt(o) {
    return parseInt(o, 10);
  }
}

start = block

block = commands:(ws comment? ws command:command ws comment? ws { return command; })*
  { return new t.Block(commands); }

command
  = pushInt
  / pushChar
  / add
  / subtract
  / multiply
  / divide
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
  / printInt
  / printChar
  / printString
  / readChar
  / varAssign
  / varRead
  / pushSubroutine
  / runSubroutine
  / if
  / while

ws = [ \n\t]*

add = '+'
  { return new t.Add(); }

subtract = '-'
  { return new t.Subtract(); }

multiply = '*'
  { return new t.Multiply(); }

divide = '/'
  { return new t.Divide(); }

negate = '_'
  { return new t.Negate(); }

equal = '='
  { return new t.Equal(); }

greater = '>'
  { return new t.Greater(); }

and = '&'
  { return new t.And(); }

or = '|'
  { return new t.Or(); }

not = '~'
  { return new t.Not(); }

duplicate = '$'
  { return new t.Duplicate(); }

delete = '%'
  { return new t.Delete(); }

swap = '\\'
  { return new t.Swap(); }

rotate = '@'
  { return new t.Rotate(); }

pick = 'ø'
  { return new t.Pick(); }

printInt = '.'
 { return new t.PrintInt(); }

printChar = ','
  { return new t.PrintChar(); }

printString = '"' quote:([^"]*) '"'
  { return new t.PrintString(quote.join("")); }

readChar = '^'
  { return new t.ReadChar(); }

pushInt = '-'?[0-9]+
  { return new t.PushInt(toInt(text())); }

pushChar = "'" char:.
  { return new t.PushChar(char); }

varAssign = name:varName ws ':' ws
  { return new t.AssignVar(name); }

varRead = name:varName ws ';' ws
  { return new t.ReadVar(name); }

varName = [a-z]

pushSubroutine = '[' block:block ']'
  { return new t.PushSubroutine(block); }

runSubroutine = '!'
  { return new t.RunSubroutine(); }

if = '?'
  { return new t.If(); }

while = '#'
  { return new t.While(); }

comment = '{' [^}]* '}'
