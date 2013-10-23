// Some colors
var Color = {
  rgb: function(r, g, b) { return 'rgb('+r+','+g+','+b+')'; },
  rgba: function(r, g, b, a) {
    if(a){
      a = a == 'rand' ? (Utils.getRandomInt(5,10)/2) : a;
      return 'rgba('+r+','+g+','+b+','+a+')'; 
    }else{
      return this.rgb(r, g, b);
    }
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
