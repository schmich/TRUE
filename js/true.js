function number(x) {
  return typeof x == 'number';
}

function block(x) {
  return x instanceof exp.Block;
}

function ensureBlock(x) {
  if (!block(x))
    throw new exp.TypeError('block', trueType(x));
}

function ensureInt(x) {
  if (!number(x))
    throw new exp.TypeError('int', trueType(x));
}

function ensureStack(env, requiredSize) {
  if (env.stack.length < requiredSize)
    throw new exp.StackError(requiredSize, env.stack.length);
}

function trueType(x) {
  if (block(x)) {
    return 'block';
  } else if (number(x)) {
    return 'int';
  } else {
    return '<' + typeof x + '>';
  }
}

var exp = {
  RuntimeError: function(message) {
    this.message = message;
    this.command = null;
  },

  StackError: function(required, actual) {
    return new exp.RuntimeError('Not enough operands on stack (required: ' + required + ', actual: ' + actual + ').');
  },

  TypeError: function(expected, actual) {
    return new exp.RuntimeError('Unexpected type (expected: ' + expected + ', actual: ' + actual + ').');
  },

  ReferenceError: function(name) {
    return new exp.RuntimeError('Referenced variable is not defined (name: ' + name + ').');
  },

  BreakError: function(command) {
    this.command = command;
  },

  Env: function() {
    var self = this;
    this.stack = [];
    this.vars = { };
    this.put = function() { };
    this.get = function() { return -1; };
    this.commands = [];

    this.addBlock = function(block) {
      for (var i = block.commands.length - 1; i >= 0; --i) {
        this.commands.unshift(block.commands[i]);
      }
    };

    this.addCommand = function(command) {
      this.commands.unshift(command);
    };

    this.stack.popInt = function() {
      ensureStack(self, 1);
      var val = this.pop();

      ensureInt(val);
      return val;
    };

    this.stack.popBlock = function() {
      ensureStack(self, 1);
      var val = this.pop();

      ensureBlock(val);
      return val;
    };
  },

  Program: function(startBlock) {
    this.exec = function(env) {
      startBlock.exec(env);
    };

    this.stepper = function(env) {
      env.addBlock(startBlock);

      return {
        step: function() {
          if (env.commands.length == 0)
            return null;

          var cmd = null;
          var next = null;
          try {
            do {
              cmd = env.commands.shift();
              cmd.step(env);

              next = this.next();
              if (next instanceof exp.Break)
                throw new exp.BreakError(next);

            } while (next && next.pass);

            return cmd;
          } catch (e) {
            if (!e.command)
              e.command = cmd;

            throw e;
          }
        },

        next: function() {
          return env.commands[0];
        }
      }
    };

    this.toString = function() {
      return startBlock.toString();
    };
  },

  BinaryOp: function(str, op) {
    this.step = this.exec = function(env) {
      ensureStack(env, 2);

      var r = env.stack.pop();
      var l = env.stack.pop();
      env.stack.push(op(l, r));
    };

    this.toString = function() {
      return str;
    };
  },

  UnaryOp: function(str, op) {
    this.step = this.exec = function(env) {
      ensureStack(env, 1);

      var s = env.stack.pop();
      env.stack.push(op(s)); 
    };

    this.toString = function() {
      return str;
    };
  },

  PushInt: function(value) {
    this.step = this.exec = function(env) {
      env.stack.push(value);
    };

    this.toString = function() {
      return value + '';
    };
  },

  PushChar: function(value) {
    this.step = this.exec = function(env) {
      env.stack.push(value.charCodeAt(0));
    };

    this.toString = function() {
      return "'" + value;
    };
  },

  Add: function() {
    return new exp.BinaryOp('+', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x + y;
    });
  },

  Subtract: function() {
    return new exp.BinaryOp('-', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x - y;
    });
  },

  Multiply: function() {
    return new exp.BinaryOp('*', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x * y;
    });
  },

  Quotient: function() {
    return new exp.BinaryOp('/', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      if (y == 0)
        throw new exp.RuntimeError('Divide by zero.');

      return Math.floor(x / y);
    });
  },

  Negate: function() {
    return new exp.UnaryOp('_', function(x) {
      ensureInt(x);

      return -x;
    });
  },

  Equal: function() {
    return new exp.BinaryOp('=', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return -(x == y);
    });
  },

  Greater: function() {
    return new exp.BinaryOp('>', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return -(x > y);
    });
  },

  And: function() {
    return new exp.BinaryOp('&', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x & y;
    });
  },

  Or: function() {
    return new exp.BinaryOp('|', function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x | y;
    });
  },

  Not: function() {
    return new exp.UnaryOp('~', function(x) {
      ensureInt(x);

      return ~x;
    });
  },

  Duplicate: function() {
    this.step = this.exec = function(env) {
      ensureStack(env, 1);

      var x = env.stack[env.stack.length - 1];
      env.stack.push(x);
    };

    this.toString = function() {
      return '$';
    };
  },

  Delete: function() {
    this.step = this.exec = function(env) {
      ensureStack(env, 1);

      env.stack.pop();
    };

    this.toString = function() {
      return '%';
    };
  },

  Swap: function() {
    this.step = this.exec = function(env) {
      ensureStack(env, 2);

      var first = env.stack.pop();
      var second = env.stack.pop();
      env.stack.push(first);
      env.stack.push(second);
    };

    this.toString = function() {
      return '\\';
    };
  },

  Rotate: function() {
    this.step = this.exec = function(env) {
      ensureStack(env, 3);

      var item = env.stack[env.stack.length - 3];
      env.stack.splice(env.stack.length - 3, 1);
      env.stack.push(item);
    };

    this.toString = function() {
      return '@';
    };
  },

  Block: function(commands) {
    this.commands = commands;

    this.step = this.exec = function(env) {
      for (var i = 0; i < commands.length; ++i) {
        commands[i].exec(env);
      } 
    };

    this.toString = function() {
      var s = '';
      for (var i = 0; i < commands.length; ++i) {
        s += commands[i].toString();

        // Add space between consecutive integers.
        if ((commands[i] instanceof exp.PushInt) && (commands[i + 1] instanceof exp.PushInt)) {
          s += ' ';
        }
      }
      return '[' + s + ']';
    };
  },

  Pick: function() {
    this.step = this.exec = function(env) {
      var index = env.stack.popInt();
      if (index < 0)
        throw new exp.RuntimeError('ø must specify non-negative index (' + index + ' given).');

      ensureStack(env, index + 1);

      var item = env.stack[env.stack.length - 1 - index];
      env.stack.push(item);
    };

    this.toString = function() {
      return 'ø';
    };
  },

  PutInt: function() {
    this.step = this.exec = function(env) {
      var x = env.stack.popInt();
      env.put(String(x));
    };

    this.toString = function() {
      return '.';
    };
  },

  PutChar: function() {
    this.step = this.exec = function(env) {
      var code = env.stack.popInt();
      env.put(String.fromCharCode(code));
    };

    this.toString = function() {
      return ',';
    };
  },

  // TODO: Support escaped quotes.
  PutString: function(string) {
    this.step = this.exec = function(env) {
      env.put(string);
    };

    this.toString = function() {
      return '"' + string + '"';
    };
  },

  GetChar: function() {
    this.step = this.exec = function(env) {
      env.stack.push(env.get());
    };

    this.toString = function() {
      return '^';
    };
  },

  AssignVar: function(name) {
    this.step = this.exec = function(env) {
      ensureStack(env, 1);

      var x = env.stack.pop();
      env.vars[name] = x;
    };

    this.toString = function() {
      return name + ':';
    };
  },

  ReadVar: function(name) {
    this.step = this.exec = function(env) {
      var x = env.vars[name];
      if (x === undefined)
        throw new exp.ReferenceError(name);

      env.stack.push(x); 
    };

    this.toString = function() {
      return name + ';';
    };
  },

  PushSubroutine: function(block) {
    this.step = this.exec = function(env) {
      env.stack.push(block);
    };

    this.toString = function() {
      return block.toString();
    };
  },

  RunSubroutine: function() {
    this.exec = function(env) {
      var sub = env.stack.popBlock();
      sub.exec(env);
    };

    this.step = function(env) {
      var sub = env.stack.popBlock();
      env.addBlock(sub);
    };

    this.toString = function() {
      return '!';
    };
  },

  If: function() {
    this.exec = function(env) {
      var sub = env.stack.popBlock();
      var condition = env.stack.popInt();

      /* Implicit int -> bool conversion. */
      if (condition)
        sub.exec(env);
    };

    this.step = function(env) {
      var sub = env.stack.popBlock();
      var condition = env.stack.popInt();

      /* Implicit int -> bool conversion. */
      if (condition)
        env.addBlock(sub);
    };

    this.toString = function() {
      return '?';
    };
  },

  While: function() {
    this.exec = function(env) {
      var body = env.stack.popBlock();
      var condition = env.stack.popBlock();

      var result = true;
      while (result) {
        condition.exec(env);
        result = env.stack.popInt();

        /* Implicit int -> bool conversion. */
        if (result)
          body.exec(env);
      }
    };

    this.step = function(env) {
      var body = env.stack.popBlock();
      var condition = env.stack.popBlock();

      env.addCommand(new exp.WhileCheck(condition, body, this));
      env.addBlock(condition);
    };

    this.toString = function() {
      return '#';
    };
  },

  WhileAgain: function(condition, body) {
    this.step = function(env) {
      var body = env.stack.popBlock();
      var condition = env.stack.popBlock();

      env.addCommand(new exp.WhileCheck(condition, body));
      env.addBlock(condition);
    };

    this.pass = true;
  },

  WhileCheck: function(condition, body) {
    var commands = condition.commands;
    if (commands.length > 0) {
      this.source = commands[commands.length - 1].source;
    } else {
      this.pass = true;
    }

    this.step = function(env) {
      var result = env.stack.popInt();

      /* Implicit int -> bool conversion. */
      if (result) {
        env.addCommand(new exp.WhileAgain(condition, body));
        env.addCommand(new exp.WhileRepeat(condition, body));
        env.addBlock(body);
      }
    };
  },

  WhileRepeat: function(condition, body) {
    this.step = function(env) {
      env.stack.push(condition);
      env.stack.push(body);
    };

    this.pass = true;
  },

  Random: function() {
    this.step = this.exec = function(env) {
      var hi = env.stack.popInt();
      var lo = env.stack.popInt();

      var rand = Math.floor((Math.random() * (hi - lo + 1)) + lo);
      env.stack.push(rand);
    };

    this.toString = function() {
      return '∆';
    };
  },

  Break: function() {
    this.step = this.exec = function(env) { };

    this.toString = function() {
      return '`';
    };
  },

  Flush: function() {
    this.step = this.exec = function(env) { };

    this.toString = function() {
      return 'ß';
    };
  },

  annotate: function(obj, loc) {
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
};

module.exports = exp;
