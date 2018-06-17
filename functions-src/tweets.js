/* global exports, process */
/* eslint camelcase: 0 */

import Twitter from "twitter";

exports.handler = function(event, context, callback) {
  const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

  client.get("statuses/user_timeline", { count: 25, exclude_replies: true, include_rts: false }, function(error, tweets, response) {
    if (error) {
      callback(error);
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(tweets.slice(0, 5))
      });
    }
  });
};
