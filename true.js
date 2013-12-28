function BinaryOp(op) {
  this.exec = function(env) {
    // TODO: Check stack.
    var r = env.stack.pop();
    var l = env.stack.pop();
    env.stack.push(op(l, r));
  };
}

function UnaryOp(op) {
  this.exec = function(env) {
    // TODO: Check stack.
    var s = env.stack.pop();
    env.stack.push(op(s)); 
  };
}

module.exports = {
  Env: function(stack) {
    this.stack = stack;
    this.vars = { };
  },

  Push: function(value) {
    this.exec = function(env) {
      env.stack.push(value);
    }
  },

  Add: function() {
    return new BinaryOp(function(x, y) {
      return x + y;
    });
  },

  Subtract: function() {
    return new BinaryOp(function(x, y) {
      return x - y;
    });
  },

  Multiply: function() {
    return new BinaryOp(function(x, y) {
      return x * y;
    });
  },

  Divide: function() {
    return new BinaryOp(function(x, y) {
      return x / y;
    });
  },

  Negate: function() {
    return new UnaryOp(function(s) {
      return -s;
    });
  },

  Equal: function() {
    return new BinaryOp(function(x, y) {
      return (x == y) ? 1 : 0;
    });
  },

  Greater: function() {
    return new BinaryOp(function(x, y) {
      return (x > y) ? 1 : 0;
    });
  },

  And: function() {
    return new BinaryOp(function(x, y) {
      return ((x != 0) && (y != 0)) ? 1 : 0;
    });
  },

  Or: function() {
    return new BinaryOp(function(x, y) {
      return ((x != 0) || (y != 0)) ? 1 : 0;
    });
  },

  Not: function() {
    return new UnaryOp(function(x) {
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
      console.log(env.stack[env.stack.length - 1]);
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
  }
}
