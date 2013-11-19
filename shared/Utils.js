var Utils = {
  // returns a random integer between min and max
  // via: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FMath%2Frandom
  randBetween: function(min, max, floating) {
    if (floating) {
      return Math.random() * (max - min + 1) + min;
    } else {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  },

  // mixin function, gives objects new functons from other objects
  mixin: function(to, from) {
    for (var prop in from.prototype) {
      if (! to.prototype[prop]) {
        to.prototype[prop] = from.prototype[prop];
      }
    }
  },

  linearTween: function(delta, current, target, duration, thresh) {
    // taken from: http://jessefreeman.com/game-dev/intro-to-math-for-game-development/
    var change = target - current;
    thresh = thresh || 0.01;
    if (Math.abs(change) < thresh) return target;
    return change * delta / duration + current;
  },

  createSessionId: function(sessionId, days) {
    // via:
    // http://stackoverflow.com/questions/4825683/how-do-i-create-and-read-a-value-from-cookie
    var date = new Date();
    days = days || 7;
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    var data = "sessionId=" + sessionId;
    var cookie = [data, ';', expires, "; path=/"];
    document.cookie = cookie.join('');
  },

  readSessionId: function() {
    if (document.cookie.length && document.cookie.match(/sessionId/)) {
      var matches = document.cookie.match(/sessionId=(\w+-\w+-\w+-\w+-\w+)/);
      return matches ? matches[1] : undefined;
    }
  },

  eraseSessionId: function() {
    this.createSessionId("");
  }
};

if (typeof module !== 'undefined') module.exports = Utils;
