var io = new RocketIO({channel: channel}).connect();

io.on("connect", function(){
  console.log("connect!! "+io.session);
});

$(function(){
  $("#stroke select#size").val(4);
  $("#btn_clear").click(function(){
    io.push("clear");
  });

  io.on("clear", function(){
    canvas.clear();
  });

  var canvas = new Canvas({target: "canvas#img", width: 640, height: 480});
  canvas.on("draw", function(pos){
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
