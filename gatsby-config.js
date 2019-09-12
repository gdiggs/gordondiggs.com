/* global module, require */

const proxy = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    title: "Gordon Diggs",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-20761002-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
      },
    }
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
