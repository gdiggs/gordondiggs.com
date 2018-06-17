/* global exports */

import letterboxd from "letterboxd";

exports.handler = function(event, context, callback) {
  letterboxd("gordondiggs", function (error, items){
    if (error) {
      return console.log(error);
      callback(error);
    }

    const result = items.filter(item => item.type === "diary").slice(0, 10);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    });
  });
};
