/*global require, module, __dirname*/
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: "Gordon Diggs",
    description: "Personal site",
    author: "Gordon Diggs",
    siteUrl: "https://gordondiggs.com",
    social: {
      github: "gdiggs",
      instagram: "gordondiggs",
      twitter: "gordondiggs",
    },
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-20761002-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    "gatsby-plugin-feed",
    "gatsby-plugin-netlify",
    "gatsby-plugin-sass",
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
   ],
  developMiddleware: app => {
    app.use(
      "/.netlify/functions",
      createProxyMiddleware("/", {
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    );
  },
};
