io = Sinatra::RocketIO
logs = Hash.new{|h,k| h[k] = Array.new }

io.on :connect do |client|
  puts "new #{client.type} connect!! <#{client.session}>"
  io.push :clients, {
    :websocket => io.sessions[:websocket].size,
    :comet => io.sessions[:comet].size
  }
  logs[client.channel].each do |log|
    io.push :draw, log, :to => client.session
  end
end

io.on :disconnect do |client|
  io.push :clients, {
    :websocket => io.sessions[:websocket].size,
    :comet => io.sessions[:comet].size
  }
end

io.on :draw do |data, client|
  puts "draw : #{data} from <#{client}>" if development?
  logs[client.channel].push data
  while logs[client.channel].size > 10000
    logs[client.channel].shift
  end
  io.push :draw, data, :channel => client.channel
end

io.on :clear do |data, client|
  puts "clear <#{client.channel}>"
  logs.delete client.channel
  io.push :clear, :channel => client.channel
end

get "/" do
  redirect "/ch1"
end

get "/:channel" do
  @channel = params[:channel]
  haml :index
end

helpers do
  def app_root
    "#{env['rack.url_scheme']}://#{env['HTTP_HOST']}#{env['SCRIPT_NAME']}"
  end
end
