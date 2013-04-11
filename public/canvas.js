var Canvas = function(opts){
  new EventEmitter().apply(this);
  if(opts.target){
    if(typeof opts.target === "string") this.target = $(opts.target);
    else this.target = opts.target;
  }
  else{
    throw("option 'target' missing");
  }
  this.target.attr("width", opts.width || 600).attr("height", opts.height || 400);
  var ctx = this.target[0].getContext("2d");
  var self = this;
  this.is_drawing = false;
  $("body").mouseup(function(){
    self.is_drawing = false;
  });
  this.target.mousedown(function(){
    self.is_drawing = true;
  });
  var last_pos = {x: null, y: null};
  this.target.mousemove(function(e){
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var pos = {x: x, y: y};
    if(self.is_drawing) self.emit("draw", {from: last_pos, to: pos});
    last_pos = pos;
  });
  this.draw_line = function(line){
    ctx.strokeStyle = line.style;
    ctx.lineWidth = line.width;
    ctx.lineCap = line.cap;
    ctx.beginPath();
    ctx.moveTo(line.from.x, line.from.y);
    ctx.lineTo(line.to.x, line.to.y);
    ctx.closePath();
    ctx.stroke();
  };
};
