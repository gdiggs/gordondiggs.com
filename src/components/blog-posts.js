import React, { Component } from "react";

class PostListing extends React.Component {
  date() {
    const obj = new Date(this.props.frontmatter.date);
    const locale = "en-us";
    return `${obj.toLocaleString(locale, { month: "long" })} ${obj.getDate()}, ${obj.getFullYear()}`;
  }

  title() {
    return this.props.frontmatter.title || this.props.fields.slug;
  }

  render() {
    return (
      <span>
        {this.date()}: <a href={this.props.fields.slug}>{this.title()}</a>
      </span>
    );
  }
}

class BlogPosts extends React.Component {
  render() {
    return (
      <div id="blog-posts" className="text-center">
        <a className="anchor" name="blog-posts"></a>
        <h2>Blog Posts</h2>

        <ul className="blog-post-list">
        {this.props.posts.map(function(post, i) {
          return (
            <li key={`blogpost${i}`}><PostListing {...post.node} /></li>
          );
        })}
        </ul>
      </div>
    );
  }
}

export default BlogPosts;
