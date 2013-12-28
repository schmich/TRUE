{
  var t = require('./true.js');

  function toInt(o) {
    return parseInt(o.join(""), 10);
  }
}

start
  = commands:(command:command ws { return command; })*   { return new t.Block(commands); }

command
  = push
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
  / varAssign
  / varRead

ws
  = [ \n\t]*

add
  = '+'                     { return new t.Add(); }

subtract
  = '-'                     { return new t.Subtract(); }

multiply
  = '*'                     { return new t.Multiply(); }

divide
  = '/'                     { return new t.Divide(); }

negate
  = '_'                     { return new t.Negate(); }

equal
  = '='                     { return new t.Equal(); }

greater
  = '>'                     { return new t.Greater(); }

and
  = '&'                     { return new t.And(); }

or
  = '|'                     { return new t.Or(); }

not
  = '~'                     { return new t.Not(); }

duplicate
  = '$'                     { return new t.Duplicate(); }

delete
  = '%'                     { return new t.Delete(); }

swap
  = '\\'                    { return new t.Swap(); }

rotate
  = '@'                     { return new t.Rotate(); }

pick
  = 'ø'                     { return new t.Pick(); }

printInt
  = '.'                          { return new t.PrintInt(); }

push
  = digits:('-'?[0-9]+)          { return new t.Push(toInt(digits)); }

varAssign
  = name:varName ws ':' ws       { return new t.AssignVar(name); }

varRead
  = name:varName ws ';' ws       { return new t.ReadVar(name); }

varName
  = [a-z]
