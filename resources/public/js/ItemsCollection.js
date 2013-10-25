function ItemsCollection() {
  this.items = [];
}

ItemsCollection.prototype.newItem = function() {
  this.items.push(new Item());
};

ItemsCollection.prototype.draw = function() {
  for(var i = 0; i < this.items.length; i++){
    var item = this.items[i];
    camera.addDrawable(item.draw.bind(item), item.position);
  }
};

ItemsCollection.prototype.update = function() {
  for(var i = 0; i < this.items.length; i++){
    var item = this.items[i];
    item.update();
  }
};


