import React from "react";
import Layout from "../components/layout";
import Link from "gatsby-link";
import Tweets from "../components/tweets.js";
import Photos from "../components/photos.js";
import Movies from "../components/movies.js";
import Records from "../components/records.js";

const IndexPage = () => (
  <Layout>
    <div>
      <Tweets />
      <Photos />
      <Movies />
      <Records />
      {/* <Blog /> */}
    </div>
  </Layout>
);

export default IndexPage;
