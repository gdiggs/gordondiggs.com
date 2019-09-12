/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          social {
            github
            instagram
            twitter
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  return (
    <div>
      <p>
        <strong>{author}</strong> is a record collector, home cook, and engineering leader. He thrives
        on helping members of his teams be successful, and loves eating sandwiches and digging through
        bins of records. He dreams of someday doing those 2 things at the same time.
        {" "}
        <a href={`https://twitter.com/${social.twitter}`}>
          Follow him on Twitter.
        </a>
      </p>
    </div>
  );
};

export default Bio;
