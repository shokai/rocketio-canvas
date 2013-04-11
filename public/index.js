var io = new RocketIO().connect();

io.on("connect", function(){
  console.log("connect!! "+io.session);
});

$(function(){
  $("#stroke select#size").val(4);

  var canvas = new Canvas({target: "canvas#img", width: 640, height: 480});
  canvas.on("draw", function(pos){
    console.log(pos);
    if(pos != null){
      var data = {
        style: $("select#color").val(),
        width: $("#stroke select#size").val(),
        cap: "square",
        from: pos.from,
        to: pos.to
      };
      io.push("draw", data);
    }
  });

  io.on("draw", function(data){
    canvas.draw_line(data);
  });
});
