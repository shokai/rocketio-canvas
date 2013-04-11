require "sinatra"
require "sinatra/rocketio"
require "sinatra/reloader" if development?
require "haml"
require File.expand_path "main", File.dirname(__FILE__)

set :websocketio, :port => (ENV['WS_PORT']||8080).to_i
run Sinatra::Application
