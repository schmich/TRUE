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

exp = {
  RuntimeError: function(message) {
    this.message = message;
  },

  StackError: function() {
    return new exp.RuntimeError('Stack is too shallow.');
  },

  TypeError: function() {
    return new exp.RuntimeError('Unexpected type.');
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
      if (env.stack.length < 2)
        throw new exp.StackError();

      var r = env.stack.pop();
      var l = env.stack.pop();
      env.stack.push(op(l, r));
    };
  },

  UnaryOp: function(op) {
    this.exec = function(env) {
      if (env.stack.length < 1)
        throw new exp.StackError();

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
      if (!number(x) || !number(y))
        throw new exp.TypeError();

      return x + y;
    });
  },

  Subtract: function() {
    return new exp.BinaryOp(function(x, y) {
      if (!number(x) || !number(y))
        throw new exp.TypeError();

      return x - y;
    });
  },

  Multiply: function() {
    return new exp.BinaryOp(function(x, y) {
      if (!number(x) || !number(y))
        throw new exp.TypeError();

      return x * y;
    });
  },

  Quotient: function() {
    return new exp.BinaryOp(function(x, y) {
      if (!number(x) || !number(y))
        throw new exp.TypeError();

      return Math.floor(x / y);
    });
  },

  Negate: function() {
    return new exp.UnaryOp(function(x) {
      if (!number(x))
        throw new exp.TypeError();

      return -x;
    });
  },

  Equal: function() {
    return new exp.BinaryOp(function(x, y) {
      if (!number(x) || !number(y))
        throw new exp.TypeError();

      return (x == y) ? trueValue() : falseValue();
    });
  },

  Greater: function() {
    return new exp.BinaryOp(function(x, y) {
      if (!number(x) || !number(y))
        throw new exp.TypeError();

      return (x > y) ? trueValue() : falseValue();
    });
  },

  And: function() {
    return new exp.BinaryOp(function(x, y) {
      if (!number(x) || !number(y))
        throw new exp.TypeError();

      return (isTrue(x) && isTrue(y)) ? trueValue() : falseValue();
    });
  },

  Or: function() {
    return new exp.BinaryOp(function(x, y) {
      if (!number(x) || !number(y))
        throw new exp.TypeError();

      return (isTrue(x) || isTrue(y)) ? trueValue() : falseValue();
    });
  },

  Not: function() {
    return new exp.UnaryOp(function(x) {
      if (!number(x))
        throw new exp.TypeError();

      return isTrue(x) ? falseValue() : trueValue();
    });
  },

  Duplicate: function() {
    this.exec = function(env) {
      if (env.stack.length < 1)
        throw new exp.StackError();

      var x = env.stack[env.stack.length - 1];
      env.stack.push(x);
    };
  },

  Delete: function() {
    this.exec = function(env) {
      if (env.stack.length < 1)
        throw new exp.StackError();

      env.stack.pop();
    };
  },

  Swap: function() {
    this.exec = function(env) {
      if (env.stack.length < 2)
        throw new exp.StackError();

      var first = env.stack.pop();
      var second = env.stack.pop();
      env.stack.push(first);
      env.stack.push(second);
    };
  },

  Rotate: function() {
    this.exec = function(env) {
      if (env.stack.length < 3)
        throw new exp.StackError();

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
      if (env.stack.length < 1)
        throw new exp.StackError();

      var index = env.stack.pop();
      if (!number(index))
        throw new exp.TypeError();

      if (index < 0)
        throw new exp.RuntimeError('Pick operation must specify non-negative index (' + index + ' given).');

      if (env.stack.length < (index + 1))
        throw new exp.StackError();

      var item = env.stack[env.stack.length - 1 - index];
      env.stack.push(item);
    };
  },

  PrintInt: function() {
    this.exec = function(env) {
      if (env.stack.length < 1)
        throw new exp.StackError();

      var x = env.stack.pop();
      env.print(String(x));
    };
  },

  PrintChar: function() {
    this.exec = function(env) {
      if (env.stack.length < 1)
        throw new exp.StackError();

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
      if (env.stack.length < 1)
        throw new exp.StackError();

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
      if (env.stack.length < 1)
        throw new exp.StackError();

      var sub = env.stack.pop();

      if (!block(sub))
        throw new exp.TypeError();

      sub.exec(env);
    };
  },

  If: function() {
    this.exec = function(env) {
      if (env.stack.length < 2)
        throw new exp.StackError();

      var sub = env.stack.pop();
      if (!block(sub))
        throw new exp.TypeError();

      var condition = env.stack.pop();
      if (!number(condition))
        throw new exp.TypeError();

      if (isTrue(condition))
        sub.exec(env);
    };
  },

  While: function() {
    this.exec = function(env) {
      if (env.stack.length < 2)
        throw new exp.StackError();

      var body = env.stack.pop();
      if (!block(body))
        throw new exp.TypeError();

      var condition = env.stack.pop();
      if (!block(condition))
        throw new exp.TypeError();

      while (true) {
        condition.exec(env);

        if (env.stack.length < 1)
          throw new exp.StackError();

        var result = env.stack.pop();
        if (!number(result))
          throw new exp.TypeError();

        if (isTrue(result))
          body.exec(env);
        else
          break;
      }
    };
  },

  Random: function() {
    this.exec = function(env) {
      if (env.stack.length < 2)
        throw new exp.StackError();

      var hi = env.stack.pop();
      var lo = env.stack.pop();

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
