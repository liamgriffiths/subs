// Some colors
var Color = {
  rgb: function(r, g, b) { return 'rgb('+r+','+g+','+b+')'; },
  rgba: function(r, g, b, a) {
    if (!a) {
      return this.rgb(r, g, b);
    }
    if (a === 'rand') {
      a = Utils.randBetween(2.5, 5, true);
    }
    return 'rgba('+r+','+g+','+b+','+a+')';
  }
};

Color.WHITE  = function(a){ return Color.rgba(255, 255, 255, a); };
Color.BLACK  = function(a){ return Color.rgba( 11,  12,  12, a); };
Color.RED    = function(a){ return Color.rgba(177,  14,  30, a); };
Color.LRED   = function(a){ return Color.rgba(223,  48,  52, a); };
Color.GREEN  = function(a){ return Color.rgba(  0, 100,  53, a); };
Color.ORANGE = function(a){ return Color.rgba(244, 119,  56, a); };
Color.YELLOW = function(a){ return Color.rgba(255, 191,  71, a); };
Color.BBLUE  = function(a){ return Color.rgba(  0, 120, 186, a); };
Color.BLUE   = function(a){ return Color.rgba(  0,   0, 255, a); };
Color.LBLUE  = function(a){ return Color.rgba( 43, 140, 196, a); };
Color.CYAN   = function(a){ return Color.rgba( 40, 161, 151, a); };
Color.PINK   = function(a){ return Color.rgba(213,  56, 128, a); };
Color.CLEAR  = function() { return Color.rgba(0,  0, 0, 0); };
Color.DPURPLE = function(a){ return Color.rgba(77, 41, 66, a); };

Color.Rand = function(){
  var colors = ['RED', 'LRED', 'GREEN', 'ORANGE', 'CYAN', 'BLUE', 'BBLUE',
                'LBLUE', 'PINK', 'DPURPLE', 'WHITE'];

  var rcolor = colors[Math.floor(Math.random() * colors.length)];
  return Color[rcolor]('rand');
};

// map a guid string to two rgba color values
Color.guidColors = function(guid) {
  var matches = guid.match(/(\w+)-(\w+)-(\w+)-(\w+)-(\w+)/);

  if (matches) {
    var scale = function(hex, min, max) {
      var n = parseInt(hex, 16);
      return Math.abs((Math.sin(n) * (max - min))) + min;
    };

    var guidRGBA = function(hex1, hex2) {
      var colors = ['RED', 'LRED', 'GREEN', 'ORANGE', 'CYAN', 'BLUE', 'BBLUE',
                    'LBLUE', 'PINK', 'DPURPLE', 'WHITE'];
      var i = Math.floor(scale(hex1, 0, colors.length));
      var a = scale(hex2, 2.5, 5);
      return Color[colors[i]](a);
    };

    return [guidRGBA(matches[1], matches[2]),
            guidRGBA(matches[3], matches[4])];
  }
  return undefined;
};

function guid(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}
