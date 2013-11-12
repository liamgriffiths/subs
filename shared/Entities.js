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
    settings.id = id;
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
  // mark for deletion
  console.log('Marked for removal <%s %s>', this.objects[id].constructor, id);
  this.objects[id].object = undefined;
  return this;
};

Entities.prototype._in = function(entities) {
  // do create or update
  for (var id in entities.update) {
    var entity = entities.update[id];
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

  // do deletes
  for (var i = 0; i < entities.remove.length; i++) {
    console.log(entities.remove[i]);
    delete this.objects[entities.remove[i]];
  }

  return this;
};

Entities.prototype._out = function() {
  var out = {
    update: {},
    remove: []
  };
  for (var id in this.objects) {
    if (! this.objects[id].object) {
      // if marked for removal, delete
      console.log('Removal <%s %s>', this.objects[id].constructor, id);
      delete this.objects[id];
      out.remove.push(id);
    } else {
      out.update[id] = {
        constructor: this.objects[id].constructor,
        object: this.objects[id].object._out()
      };
    }
  }
  return out;
};

if (typeof module != 'undefined') module.exports = Entities;