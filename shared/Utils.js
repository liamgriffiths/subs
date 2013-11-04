var Utils = {
  // returns a random integer between min and max
  // via: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FMath%2Frandom
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  // mixin function, gives objects new functons from other objects
  mixin: function(to, from) {
    for(var prop in from.prototype) {
      if(!to.prototype[prop]) {
        to.prototype[prop] = from.prototype[prop];
      }
    }
  },

  // returns a guid, used to give objects unique ids
  // via http://stackoverflow.com/a/2117523/152729
  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
};

module.exports = Utils;
