var root = typeof global != 'undefined' ? global : window;

function Entities(root) {
  // ex.
  // { 'guid-1234-abcd' : { constructor: 'Tile', object: [Object object] }
  this.objects = {};
}

Entities.prototype.guid = function() {
  // returns a guid, used to give objects unique ids
  // via http://stackoverflow.com/a/2117523/152729
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

Entities.prototype.create = function(constructor, settings) {
  var id = this.guid();
  if (id) {
    this.objects[id] = {
      constructor: constructor,
      object: new root[constructor](settings)
    };
    console.log('Created <%s %s>', constructor, id);
    return id;
  } else {
    return false;
  }
};

Entities.prototype.find = function(id) {
  if (this.objects[id]) return this.objects[id].object;
  return false;
};

Entities.prototype.remove = function(id) {
  console.log('Removed <%s %s>', this.objects[id].constructor, id);
  return delete this.objects[id];
};

Entities.prototype._in = function(entities) {
  for (var id in entities) {
    var entity = entities[id];
    var settings = root[entity.constructor].prototype._in(entity.object);

    if (this.objects[id]) {
      // update existing object with new settings from the server
      if (this.objects[id].object.set) {
        this.objects[id].object.set(settings);
      }
    } else {
      // create new object in objects array
      this.objects[id] = {
        constructor: entity.constructor,
        object: new root[entity.constructor](settings)
      };

      // set up client side-specific data
      // TODO: have an 'init' function to run everything for a particular obj?
      if ('makeSprites' in root[entity.constructor].prototype) {
        root[entity.constructor].prototype.makeSprites.call(this.objects[id].object);
      }
    }
  }
  return this;
};

Entities.prototype._out = function() {
  var out = {};
  for (var id in this.objects) {
    out[id] = {
      constructor: this.objects[id].constructor,
      object: this.objects[id].object._out()
    };
  }
  return out;
};

if (typeof module != 'undefined') module.exports = Entities;
