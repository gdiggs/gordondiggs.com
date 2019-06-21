import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/header";
import "./index.scss";

const Layout = ({ children }) => (
  <div>
    <Helmet title="Gordon Diggs" />
    <Header siteTitle="Gordon Diggs" />
    <div>
      {children}
    </div>
    <footer className="text-center">
      <p><a href="https://github.com/gordondiggs/gordondiggs.com">See the code for this site on Github</a></p>
      <p>Sloths are cool.</p>
    </footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;
