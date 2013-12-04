var root = typeof global != 'undefined' ? global : window;

if (typeof global != 'undefined') {
  // if server-side, require other classes
  root.Board = require('../server/Board');
  root.Tile = require('../server/Tile');
  root.Item = require('./Item');
  root.Mine = require('../server/Mine');
  root.Player = require('../server/Player');
}

function Entities(root) {
  // ex.
  // { 'guid-1234-abcd' : { constructor: 'Tile', object: [Object object] }
  this.objects = {};
  this.previous = {};

  this.types = {};
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

    if ('init' in root[constructor].prototype) {
      root[constructor].prototype.init.call(this.objects[id].object);
    }

    return id;
  } else {
    return false;
  }
};

Entities.prototype.update = function(now, delta, board) {
  for (var id in this.objects) {
    var object = this.objects[id].object;
    if (object && object.update) {
      object.update(now, delta, board);
    }
  }
  return this;
};

Entities.prototype.find = function(id) {
  if (id in this.objects) return this.objects[id].object;
  return false;
};

Entities.prototype.each = function(fn) {
  for (var id in this.objects) {
    fn(this.objects[id]);
  }
};

Entities.prototype.set = function(id, settings) {
  if (id in this.objects) {
    for (var prop in settings) {
      this.objects[id].object[prop] = settings[prop];
    }
  }
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

    if (id in this.objects) {
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

      // set up client side-specific data, look for and run 'init' function
      if ('init' in root[entity.constructor].prototype) {
        root[entity.constructor].prototype.init.call(this.objects[id].object);
      }

      // add id types list
      if (! (entity.constructor in this.types)) this.types[entity.constructor] = [];
      this.types[entity.constructor].push(id);
    }
  }

  // do deletes
  for (var i = 0; i < entities.remove.length; i++) {
    var rmid = entities.remove[i];
    delete this.objects[rmid];

    // delete from types lists
    for (var type in this.types) {
      var idx = this.types[type].indexOf(rmid);
      if (idx) {
        delete this.types[type][id];
        break;
      }
    }
  }

  return this;
};

Entities.prototype._out = function(options) {
  var out = {
    timestamp: new Date().getTime(),
    update: {},
    remove: []
  };

  for (var id in this.objects) {
    var entity = this.objects[id];

    if (! entity.object) {
      // if marked for removal, delete
      console.log('Removing <%s %s>', entity.constructor, id);
      delete this.objects[id];
      out.remove.push(id);

    } else {
      var encodedEntity = {
        constructor: entity.constructor,
        object: entity.object._out()
      };

      var objString = JSON.stringify(encodedEntity.object);

      if (options && options.diff) {
        // output will contain only differences
        if (this.previous[id] !== objString) {
          out.update[id] = encodedEntity;
        }
      } else {
        // output will contain all entities
        out.update[id] =  encodedEntity;
      }
      this.previous[id] = objString;
    }
  }
  return out;
};

if (typeof module != 'undefined') module.exports = Entities;
