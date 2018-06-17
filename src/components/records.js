import React, { Component } from "react";
import axios from "axios";

class Record extends Component {
  url() {
    return `https://rayons.info/items/${this.props.id}`;
  }

  render() {
    return (
      <span>
        <i><a href={this.url()}>{this.props.title}</a></i> by {this.props.artist} ({this.props.color} {this.props.format} released {this.props.year} on {this.props.label})
      </span>
    );
  }
}

class Records extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: []
    };
  }

  componentDidMount() {
    axios.get(".netlify/functions/records")
      .then(resp => {
        this.setState({
          records: resp.data
        });
      });
  }

  render() {
    return (
      <div id="photos" className="text-center">
        <a className="anchor" name="records"></a>
        <h2>Latest Records <a href="https://rayons.info">See all</a></h2>
        <ul>
        {this.state.records.map(function(record) {
          return (
            <li key={record.id}><Record {...record} /></li>
          );
        })}
        </ul>
      </div>
    );
  }
};

export default Records;
