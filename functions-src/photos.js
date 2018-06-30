/* global exports, process */

import Instagram from "node-instagram";

const instagram = new Instagram({
  accessToken: process.env.IG_ACCESS_TOKEN,
  clientId: process.env.IG_CLIENT_ID,
  clientSecret: process.env.IG_CLIENT_SECRET
});

exports.handler = function(event, context, callback) {
  instagram.get("users/self/media/recent", { count: 12 }).then(data => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    });
  }).catch((err) => {
    callback(err);
  });
};
