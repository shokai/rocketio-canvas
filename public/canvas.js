var Canvas = function(opts){
  var self = this;
  new EventEmitter().apply(this);
  if(opts.target){
    if(typeof opts.target === "string") this.target = $(opts.target);
    else this.target = opts.target;
  }
  else{
    throw("option 'target' missing");
  }
  this.width = opts.width || 600;
  this.height = opts.height || 400;
  this.target.attr("width", this.width).attr("height", this.height);
  var ctx = this.target[0].getContext("2d");
  this.is_drawing = false;
  var last_pos = null;
  $("body").bind("mouseup", function(){
    self.is_drawing = false;
    last_pos = null;
  });
  this.target.bind("mousedown", function(){
    self.is_drawing = true;
  });
  this.target.bind("mousemove", function(e){
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var pos = {x: x, y: y};
    if(self.is_drawing && last_pos !== null) self.emit("draw", {from: last_pos, to: pos});
    last_pos = pos;
  });
  this.target.bind("touchend", function(){
    self.is_drawing = false;
    last_pos = null;
  });
  this.target.bind("touchstart", function(){
    self.is_drawing = true;
  });
  this.target.bind("touchmove", function(e){
    e.preventDefault();
    var rect = e.target.getBoundingClientRect();
    var x = event.changedTouches[0].pageX - rect.left;
    var y = event.changedTouches[0].pageY - rect.top;
    var pos = {x: x, y: y};
    if(self.is_drawing && last_pos !== null) self.emit("draw", {from: last_pos, to: pos});
    last_pos = pos;
  });
  this.draw_line = function(line){
    ctx.strokeStyle = line.style;
    ctx.lineWidth = line.width;
    ctx.lineCap = line.lineCap;
    ctx.lineJoin = line.lineJoin;
    ctx.beginPath();
    ctx.moveTo(line.from.x, line.from.y);
    ctx.lineTo(line.to.x, line.to.y);
    ctx.stroke();
    ctx.closePath();
  };
  this.clear = function(){
    ctx.clearRect(0, 0, self.width, self.height);
  };
};
