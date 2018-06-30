/* global exports */

import axios from "axios";

exports.handler = function(event, context, callback) {
  axios.get("https://rayons.info/items/latest.json?num=10")
    .then(resp => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(resp.data)
      });
    })
    .catch(function (error) {
      console.log(error);
      callback(error);
    });
};
