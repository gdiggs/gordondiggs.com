require 'bundler'
Bundler.require

DEFAULT_NUM_ITEMS = 10
CATEGORIES = ['tweets', 'photos', 'records', 'code', 'blog', 'contact']

get '/' do
  haml :index
end

get '/stylesheet.css' do
  scss :stylesheet
end

CATEGORIES.each do |category|
  get "/latest_#{category}.json" do
    send("latest_#{category}").to_json
  end
end

helpers do
  def latest_tweets
    [{content: "tweet"}]
  end
end
