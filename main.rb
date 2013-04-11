io = Sinatra::RocketIO

io.on :connect do |client|
  puts "new #{client.type} connect!! <#{client.session}>"
end

io.on :draw do |data, client|
  puts "draw : #{data} from <#{client}>"
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
