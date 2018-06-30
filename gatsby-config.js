/* global module, require */

const proxy = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    title: "Gordon Diggs",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-netlify"
  ],
  developMiddleware: app => {
    app.use(
      "/.netlify/functions",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    );
  },
};
