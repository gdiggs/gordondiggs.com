import React, { Component } from "react";
import axios from "axios";

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    axios.get(".netlify/functions/photos")
      .then(resp => {
        this.setState({
          photos: resp.data.data
        });
      });
  }

  render() {
    return (
      <div id="photos" className="text-center">
        <a className="anchor" name="photos"></a>
        <h2>Latest Photos <a href="https://instagram.com/gordondiggs">See all</a></h2>
        {this.state.photos.map(function(photo, i) {
          const result = [<a href={photo.link} key={photo.id}><img src={photo.images.thumbnail.url} /></a>];
          if ((i + 1) % 3 === 0) {
            result.push(<br />);
          }
          return result;
        })}
      </div>
    );
  }
};

export default Photos;
