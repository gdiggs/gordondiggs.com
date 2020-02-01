import React, { Component } from "react";
import axios from "axios";

class Mix extends Component {
  createdAt() {
    const date = new Date(this.props.created_time);
    const month = date.toLocaleString("default", { month: "long" });
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  }

  render() {
    return (
      <span>
        {this.createdAt()}: <a href={this.props.url}>{this.props.name}</a>
      </span>
    );
  }
}

class Mixes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mixes: []
    };
  }

  componentDidMount() {
    axios.get("https://api.mixcloud.com/gdiggs/cloudcasts/")
      .then(resp => {
        this.setState({
          mixes: resp.data.data
        });
      });
  }

  render() {
    return (
      <div id="mixes" className="text-center">
        <a className="anchor" name="mixes"></a>
        <h2>Latest Mixes <a href="https://mixcloud.com/gdiggs">See all</a></h2>
        <ul>
        {this.state.mixes.map(function(mix) {
          return (
            <li key={mix.slug}><Mix {...mix} /></li>
          );
        })}
        </ul>
      </div>
    );
  }
};

export default Mixes;
