 // Mixin to handle eventable objects
 // TODO: write explaination of this
function Eventable() { }

Eventable.prototype._events = {};

Eventable.prototype.on = function(eventName, fn) {
  this._events[eventName] = fn;
  return this;
};

Eventable.prototype.onOnce = function(eventName, fn) {
  var _this = this;
  this._events[eventName] = function() {
    fn();
    return _this.turnOff(eventName);
  };
  return this;
};

Eventable.prototype.turnOff = function(eventName) {
  if (eventName in this._events) {
    return delete(this._events[eventName]);
  } else {
    return false;
  }
};

Eventable.prototype.trigger = function(eventName, fn) {
  if (eventName in this._events) {
    return this._events[eventName](this);
  } else {
    return false;
  }
};
