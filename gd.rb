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

  Tumblr.configure do |config|
    config.consumer_key = ENV['TUMBLR_CONSUMER_KEY']
    config.consumer_secret = ENV['TUMBLR_SECRET_KEY']
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
  def latest_blog
    client = Tumblr::Client.new
    response = client.posts("gordondiggs.tumblr.com")
    response['posts'].first(DEFAULT_NUM_ITEMS)
  end

  def latest_code
    feed = Feedzirra::Feed.fetch_and_parse('https://github.com/gordondiggs.atom')
    entries = feed.entries.first(DEFAULT_NUM_ITEMS)
    entries.map do |entry|
      page = Nokogiri::HTML(entry.content)
      str = page.css('time').first.to_s
      str += " - "
      str += page.css('.title').first.inner_html
      message = page.css('.message').first.css('blockquote').inner_html.strip rescue nil
      str += " - #{message}" if message
      str
    end
  end

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
    response = Typhoeus.get("https://x-vinyl.herokuapp.com/items/latest.json?num=#{DEFAULT_NUM_ITEMS}")
    JSON.parse(response.body)
  end
end
