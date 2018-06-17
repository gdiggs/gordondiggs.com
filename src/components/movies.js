import React, { Component } from "react";
import axios from "axios";

class Movie extends Component {
  date() {
    const obj = new Date(this.props.date.watched);
    const locale = "en-us";
    return `${obj.toLocaleString(locale, { month: "long" })} ${obj.getDate()}, ${obj.getFullYear()}`;
  }

  render() {
    return (
      <span>
        {this.date()}: <a href={this.props.uri}>{this.props.film.title}</a> <small className="rating">{this.props.rating.text}</small>
      </span>
    );
  }
}

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios.get(".netlify/functions/movies")
      .then(resp => {
        console.log(resp);
        this.setState({
          movies: resp.data
        });
      });
  }

  render() {
    return (
      <div id="movies" className="text-center">
        <a className="anchor" name="movies"></a>
        <h2>Latest Movies <a href="https://letterboxd.com/gordondiggs/">See all</a></h2>

        <ul className="movie-list">
        {this.state.movies.map(function(movie, i) {
          return (
            <li key={`movie${i}`}><Movie {...movie} /></li>
          );
        })}
        </ul>
      </div>
    );
  }
}

export default Movies;
