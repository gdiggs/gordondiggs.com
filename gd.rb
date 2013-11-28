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

  Instagram.configure do |config|
    config.client_id = ENV['INSTAGRAM_CLIENT_ID']
    config.client_secret = ENV['INSTAGRAM_CLIENT_SECRET']
    config.access_token = ENV['INSTAGRAM_ACCESS_TOKEN']
  end
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
  def latest_photos
    Instagram.user_recent_media(15938031).first(12).map do |image|
      {:url => image.link, :src => image.images.low_resolution.url}
    end
  end

  def latest_tweets
    tweets = settings.twitter_client.user_timeline("GordonDiggs", :exclude_replies => true, :count => 5)

    tweets.map do |t|
      settings.twitter_client.oembed(t).html
    end

  rescue Twitter::Error::Unauthorized => e
    puts "!!! ERROR: #{e}"
    return []
  end

  def latest_records
    response = Typhoeus.get("https://x-vinyl.herokuapp.com/items/latest.json")
    JSON.parse(response.body)
  end
end
