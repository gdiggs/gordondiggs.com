require 'bundler'
Bundler.require

get '/' do
  haml :index
end

get '/stylesheet.css' do
  scss :stylesheet
end
