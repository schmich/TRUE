exp = {
  Env: function(stack, vars) {
    this.stack = stack;
    this.vars = vars;
  },

  BinaryOp: function(op) {
    this.exec = function(env) {
      // TODO: Check stack.
      var r = env.stack.pop();
      var l = env.stack.pop();
      env.stack.push(op(l, r));
    };
  },

  UnaryOp: function(op) {
    this.exec = function(env) {
      // TODO: Check stack.
      var s = env.stack.pop();
      env.stack.push(op(s)); 
    };
  },

  Push: function(value) {
    this.exec = function(env) {
      env.stack.push(value);
    }
  },

  Add: function() {
    return new exp.BinaryOp(function(x, y) {
      return x + y;
    });
  },

  Subtract: function() {
    return new exp.BinaryOp(function(x, y) {
      return x - y;
    });
  },

  Multiply: function() {
    return new exp.BinaryOp(function(x, y) {
      return x * y;
    });
  },

  Divide: function() {
    return new exp.BinaryOp(function(x, y) {
      return x / y;
    });
  },

  Negate: function() {
    return new exp.UnaryOp(function(s) {
      return -s;
    });
  },

  Equal: function() {
    return new exp.BinaryOp(function(x, y) {
      return (x == y) ? 1 : 0;
    });
  },

  Greater: function() {
    return new exp.BinaryOp(function(x, y) {
      return (x > y) ? 1 : 0;
    });
  },

  And: function() {
    return new exp.BinaryOp(function(x, y) {
      return ((x != 0) && (y != 0)) ? 1 : 0;
    });
  },

  Or: function() {
    return new exp.BinaryOp(function(x, y) {
      return ((x != 0) || (y != 0)) ? 1 : 0;
    });
  },

  Not: function() {
    return new exp.UnaryOp(function(x) {
      return (x == 0) ? 1 : 0;
    });
  },

  Duplicate: function() {
    this.exec = function(env) {
      // TODO: Check stack.
      env.stack.push(env.stack[env.stack.length - 1]);
    };
  },

  Delete: function() {
    this.exec = function(env) {
      // TODO: Check stack.
      env.stack.pop();
    };
  },

  Swap: function() {
    this.exec = function(env) {
      // TODO: Check stack.
      var first = env.stack.pop();
      var second = env.stack.pop();
      env.stack.push(first);
      env.stack.push(second);
    };
  },

  Rotate: function() {
    this.exec = function(env) {
      // TODO: Check stack.
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
      // TODO: Check stack.
      var index = env.stack.pop();
      // TODO: Ensure index >= 0.
      // TODO: Check stack.
      var item = env.stack[env.stack.length - 1 - index];
      env.stack.push(item);
    };
  },

  PrintInt: function() {
    this.exec = function(env) {
      // TODO: Check stack.
      // TODO: Inject print function.
      var x = env.stack[env.stack.length - 1];
      process.stdout.write(String(x));
    };
  },

  PrintChar: function() {
    this.exec = function(env) {
      // TODO: Check stack.
      // TODO: Inject print function.
      var code = env.stack[env.stack.length - 1];
      process.stdout.write(String.fromCharCode(code));
    };
  },

  // TODO: Support escaped quotes.
  PrintString: function(string) {
    this.exec = function(env) {
      process.stdout.write(string);
    };
  },

  ReadChar: function() {
    this.exec = function(env) {
      // TODO: Implement.
    };
  },

  AssignVar: function(name) {
    this.exec = function(env) {
      // TODO: Check stack.
      var x = env.stack.pop();
      env.vars[name] = x;
    };
  },

  ReadVar: function(name) {
    this.exec = function(env) {
      // TODO: Check for var.
      var x = env.vars[name];
      env.stack.push(x); 
    };
  },

  Subroutine: function(block) {
    this.exec = function(env) {
      env.stack.push(block);
    };
  },

  RunSubroutine: function() {
    this.exec = function(env) {
      // TODO: Check stack.
      var sub = env.stack.pop();
      // TODO: Check type.
      sub.exec(env);
    };
  },

  If: function() {
    this.exec = function(env) {
      // TODO: Check stack.
      var sub = env.stack.pop();
      // TODO: Check stack.
      var condition = env.stack.pop();
      // TODO: Check type.
      if (condition != 0)
        sub.exec(env);
    };
  },

  While: function() {
    this.exec = function(env) {
      // TODO: Check stack.
      var body = env.stack.pop();
      // TODO: Check stack.
      var condition = env.stack.pop();
      // TODO: Check types.
      // TODO: Check stack.
      while (condition.exec(env), env.stack[env.stack.length - 1] != 0) {
        body.exec(env);
      }
    };
  }
};

module.exports = exp;
