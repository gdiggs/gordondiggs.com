/*global __PATH_PREFIX__*/

import React from "react";
import Link from "gatsby-link";
import FontAwesome from "react-fontawesome";

class Header extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    return (
      <div>
        <h1 className="text-center">
          <a href="/">{this.props.title}</a>
        </h1>
        <nav className="social text-center">
          <a href="https://twitter.com/gordondiggs"><FontAwesome name="twitter" /></a>
          <a href="https://www.linkedin.com/in/gordondiggs"><FontAwesome name="linkedin" /></a>
          <a href="https://github.com/gdiggs"><FontAwesome name="github" /></a>
          <a href="javascript:location='mailto:\u0067\u006f\u0072\u0064\u006f\u006e\u0040\u0067\u006f\u0072\u0064\u006f\u006e\u0064\u0069\u0067\u0067\u0073\u002e\u0063\u006f\u006d';void 0">
            <FontAwesome name="envelope" />
          </a>
        </nav>
      </div>
    );
  }
};

export default Header;
