import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet";

import Header from "../components/header";
import "./index.scss";

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <div>
        <Helmet title={title} />
        <Header siteTitle={title} />
        <div>{children}</div>
        <footer className="text-center">
          <p><a href="https://github.com/gordondiggs/gordondiggs.com">See the code for this site on Github</a></p>
          <p>Sloths are cool.</p>
        </footer>
      </div>
    )
  }
}

export default Layout
