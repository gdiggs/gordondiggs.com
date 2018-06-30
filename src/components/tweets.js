import React, { Component } from "react";
import { Tweet } from "react-twitter-widgets";
import axios from "axios";


class Tweets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: []
    };
  }

  componentDidMount() {
    axios.get(".netlify/functions/tweets")
      .then(resp => {
        this.setState({
          tweets: resp.data
        });
      });
  }

  render() {
    return (
      <div id="tweets">
        <a className="anchor" name="tweets"></a>
        <h2 className="text-center">Latest Tweets</h2>
        {this.state.tweets.map(function(tweet) {
          return <Tweet tweetId={tweet.id_str} key={tweet.id} options={{ align: "center" }} />;
        })}
      </div>
    );
  }
}

export default Tweets;
