io = Sinatra::RocketIO
logs = Hash.new{|h,k| h[k] = Array.new }

io.on :connect do |client|
  puts "new #{client.type} connect!! <#{client.session}>"
  logs[client.channel].each do |log|
    io.push :draw, log, :to => client.session
  end
end

io.on :draw do |data, client|
  puts "draw : #{data} from <#{client}>"
  logs[client.channel].push data
  while logs[client.channel].size > 10000
    logs[client.channel].shift
  end
  io.push :draw, data, :channel => client.channel
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
