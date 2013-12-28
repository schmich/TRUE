function number(x) {
  return typeof x == 'number';
}

function block(x) {
  return x instanceof exp.Block;
}

function trueValue() {
  return -1;
}

function falseValue() {
  return 0;
}

function isTrue(x) {
  return x != falseValue();
}

function isFalse(x) {
  return x == falseValue();
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
    this.stack = [];
    this.vars = { };
    this.print = function() { };
    this.readChar = function() { return -1; };
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

      return (x == y) ? trueValue() : falseValue();
    });
  },

  Greater: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return (x > y) ? trueValue() : falseValue();
    });
  },

  And: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return (isTrue(x) && isTrue(y)) ? trueValue() : falseValue();
    });
  },

  Or: function() {
    return new exp.BinaryOp(function(x, y) {
      ensureInt(x);
      ensureInt(y);

      return (isTrue(x) || isTrue(y)) ? trueValue() : falseValue();
    });
  },

  Not: function() {
    return new exp.UnaryOp(function(x) {
      ensureInt(x);

      return isTrue(x) ? falseValue() : trueValue();
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
      ensureStack(env, 1);

      var index = env.stack.pop();
      ensureInt(index);

      if (index < 0)
        throw new exp.RuntimeError('ø must specify non-negative index (' + index + ' given).');

      ensureStack(env, index + 1);

      var item = env.stack[env.stack.length - 1 - index];
      env.stack.push(item);
    };
  },

  PrintInt: function() {
    this.exec = function(env) {
      ensureStack(env, 1);

      var x = env.stack.pop();
      env.print(String(x));
    };
  },

  PrintChar: function() {
    this.exec = function(env) {
      ensureStack(env, 1);

      var code = env.stack.pop();
      env.print(String.fromCharCode(code));
    };
  },

  // TODO: Support escaped quotes.
  PrintString: function(string) {
    this.exec = function(env) {
      env.print(string);
    };
  },

  ReadChar: function() {
    this.exec = function(env) {
      env.stack.push(env.readChar());
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
      ensureStack(env, 1);

      var sub = env.stack.pop();
      ensureBlock(sub);

      sub.exec(env);
    };
  },

  If: function() {
    this.exec = function(env) {
      ensureStack(env, 2);

      var sub = env.stack.pop();
      ensureBlock(sub);

      var condition = env.stack.pop();
      ensureInt(condition);

      if (isTrue(condition))
        sub.exec(env);
    };
  },

  While: function() {
    this.exec = function(env) {
      ensureStack(env, 2);

      var body = env.stack.pop();
      ensureBlock(body);

      var condition = env.stack.pop();
      ensureBlock(condition);

      while (true) {
        condition.exec(env);
        ensureStack(env, 1);

        var result = env.stack.pop();
        ensureInt(result);

        if (isTrue(result))
          body.exec(env);
        else
          break;
      }
    };
  },

  Random: function() {
    this.exec = function(env) {
      ensureStack(env, 2);

      var hi = env.stack.pop();
      ensureInt(hi);

      var lo = env.stack.pop();
      ensureInt(lo);

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
