io = Sinatra::RocketIO

io.on :connect do |client|
  puts "new #{client.type} connect!! <#{client.session}>"
end

get "/" do
  haml :index
end

helpers do
  def app_root
    "#{env['rack.url_scheme']}://#{env['HTTP_HOST']}#{env['SCRIPT_NAME']}"
  end
end
