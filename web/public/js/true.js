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

  Env: function() {
    var self = this;
    this.stack = [];
    this.vars = { };
    this.put = function() { };
    this.get = function() { return -1; };
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

  BinaryOp: function(op) {
    this.exec = function(env) {
      ensureStack(env, 2);

      var r = env.stack.pop();
      var l = env.stack.pop();
      env.stack.push(op(l, r));
    };
  },

  UnaryOp: function(op) {
    this.exec = function(env) {
      ensureStack(env, 1);

      var s = env.stack.pop();
      env.stack.push(op(s)); 
    };
  },

  PushLiteral: function(value) {
    this.exec = function(env) {
      env.stack.push(value);
    }
  },

  PushInt: function(value) {
    return new exp.PushLiteral(value);
  },

  PushChar: function(value) {
    return new exp.PushLiteral(value.charCodeAt(0));
  },

  Add: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x + y;
    });
  },

  Subtract: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x - y;
    });
  },

  Multiply: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x * y;
    });
  },

  Quotient: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      if (y == 0)
        throw new exp.RuntimeError('Divide by zero.');

      return Math.floor(x / y);
    });
  },

  Negate: function() {
    return new exp.UnaryOp(function(x) {
      ensureInt(x);

      return -x;
    });
  },

  Equal: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return -(x == y);
    });
  },

  Greater: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return -(x > y);
    });
  },

  And: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x & y;
    });
  },

  Or: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return x | y;
    });
  },

  Not: function() {
    return new exp.UnaryOp(function(x) {
      ensureInt(x);

      return ~x;
    });
  },

  Duplicate: function() {
    this.exec = function(env) {
      ensureStack(env, 1);

      var x = env.stack[env.stack.length - 1];
      env.stack.push(x);
    };
  },

  Delete: function() {
    this.exec = function(env) {
      ensureStack(env, 1);

      env.stack.pop();
    };
  },

  Swap: function() {
    this.exec = function(env) {
      ensureStack(env, 2);

      var first = env.stack.pop();
      var second = env.stack.pop();
      env.stack.push(first);
      env.stack.push(second);
    };
  },

  Rotate: function() {
    this.exec = function(env) {
      ensureStack(env, 3);

      var item = env.stack[env.stack.length - 3];
      env.stack.splice(env.stack.length - 3, 1);
      env.stack.push(item);
    };
  },

  Block: function(commands) {
    this.exec = function(env) {
      for (var i = 0; i < commands.length; ++i) {
        commands[i].exec(env);
      } 
    };
  },

  Pick: function() {
    this.exec = function(env) {
      var index = env.stack.popInt();
      if (index < 0)
        throw new exp.RuntimeError('ø must specify non-negative index (' + index + ' given).');

      ensureStack(env, index + 1);

      var item = env.stack[env.stack.length - 1 - index];
      env.stack.push(item);
    };
  },

  PutInt: function() {
    this.exec = function(env) {
      var x = env.stack.popInt();
      env.put(String(x));
    };
  },

  PutChar: function() {
    this.exec = function(env) {
      var code = env.stack.popInt();
      env.put(String.fromCharCode(code));
    };
  },

  // TODO: Support escaped quotes.
  PutString: function(string) {
    this.exec = function(env) {
      env.put(string);
    };
  },

  GetChar: function() {
    this.exec = function(env) {
      env.stack.push(env.get());
    };
  },

  AssignVar: function(name) {
    this.exec = function(env) {
      ensureStack(env, 1);

      var x = env.stack.pop();
      env.vars[name] = x;
    };
  },

  ReadVar: function(name) {
    this.exec = function(env) {
      var x = env.vars[name];
      if (x === undefined)
        throw new exp.ReferenceError(name);

      env.stack.push(x); 
    };
  },

  PushSubroutine: function(block) {
    this.exec = function(env) {
      env.stack.push(block);
    };
  },

  RunSubroutine: function() {
    this.exec = function(env) {
      var sub = env.stack.popBlock();
      sub.exec(env);
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
  },

  Random: function() {
    this.exec = function(env) {
      var hi = env.stack.popInt();
      var lo = env.stack.popInt();

      var rand = Math.floor((Math.random() * (hi - lo + 1)) + lo);
      env.stack.push(rand);
    };
  },

  Flush: function() {
    this.exec = function(env) { };
  },

  Assembly: function() {
    this.exec = function(env) { };
  }
};

$t = exp;
