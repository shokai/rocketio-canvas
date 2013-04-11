var io = new RocketIO().connect();

io.on("connect", function(){
  console.log("connect!! "+io.session);
});
