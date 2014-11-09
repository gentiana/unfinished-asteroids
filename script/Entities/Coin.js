ENGINE.Coin = function(args) {

  Utils.extend(this, {
    color: "#ff0" /* default color if none is provided */
  }, args);
  
  this.frame = 0;
  this.sprite = this.sprites[this.frame];
  this.frames = this.sprites.length;

  this.width = this.sprite[2];
  this.height = this.sprite[3];
  this.radius = Math.min(this.width, this.height) / 2 | 0;

};

ENGINE.Coin.prototype = {

  constructor: ENGINE.Coin,

  collidable: true,
  
  sprites: [
    [1, 1, 8, 8],
    [11, 1, 8, 8],
    [21, 1, 8, 8],
    [31, 1, 8, 8],
    [41, 1, 8, 8],
    [51, 1, 8, 8],
    [61, 1, 8, 8]
  ],

  collision: function(object) {

    if (object instanceof ENGINE.Player) {
      this.collection.remove(this);
      object.reward(5);
    }

  },

  step: function(delta) {
    
    this.frame += 5 * delta;
    this.frame %= this.frames;
    
    this.sprite = this.sprites[parseInt(this.frame)];
    
  },

  render: function(delta) {

    app.layer.save();

    app.layer.translate(this.x, this.y);
    app.layer.drawRegion(app.images.coins, this.sprite, -this.width / 2, -this.height / 2);

    app.layer.restore();

  }

};