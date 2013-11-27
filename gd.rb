require 'bundler'
Bundler.require

DEFAULT_NUM_ITEMS = 10
CATEGORIES = ['tweets', 'photos', 'records', 'code', 'blog', 'contact']

configure do
  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV['CONSUMER_KEY']
    config.consumer_secret     = ENV['CONSUMER_SECRET']
    config.access_token        = ENV['ACCESS_TOKEN']
    config.access_token_secret = ENV['ACCESS_SECRET']
  end
  set :twitter_client, client
end

get '/' do
  haml :index
end

get '/stylesheet.css' do
  scss :stylesheet
end

CATEGORIES.each do |category|
  get "/latest_#{category}.json" do
    content_type :json
    send("latest_#{category}").to_json
  end
end

helpers do
  def latest_tweets
    tweets = settings.twitter_client.user_timeline("GordonDiggs", :exclude_replies => true, :count => DEFAULT_NUM_ITEMS)
    tweets.map { |t| {text: t.text, favorites: t.favorite_count, retweets: t.retweet_count, uri: t.uri, created_at: t.created_at} }
  end
end
