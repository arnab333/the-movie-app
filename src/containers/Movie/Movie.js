import React, { Component } from 'react';
import axios from 'axios';

import { API_KEY, API_URL } from '../../config';
import Navigation from '../../components/Navigation/Navigation';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import MovieInfoBar from '../../components/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../../components/FourColGrid/FourColGrid';
import Actor from '../../components/Actor/Actor';
import Spinner from '../../components/Spinner/Spinner';

import './Movie.css';

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  movieIdFromProps = this.props.match.params.movieId;

  componentDidMount() {
    this.setState({ loading: true });

    // ## fetching the movie
    const endpoint = `${API_URL}movie/${this.movieIdFromProps}?api_key=${API_KEY}&language=en-US`;

    this.fetchMovie(endpoint);

    // ## fetching the credits
    const creditsEndpoint = `${API_URL}movie/${this.movieIdFromProps}/credits?api_key=${API_KEY}`;

    this.fetchCredits(creditsEndpoint);
  }

  fetchMovie = (endpoint) => {
    axios
      .get(endpoint)
      .then((response) => {
        if (response.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchCredits = (endpoint) => {
    axios
      .get(endpoint)
      .then((response) => {
        const directors = response.data.crew.filter(
          (member) => member.job === 'Director'
        );

        this.setState({
          actors: response.data.cast,
          directors: directors,
          loading: false
        });
      })
      .catch((error) => {
        return console.log(error);
      });
  };

  render() {
    let movieElement = null;
    let actorsElement = null;

    if (this.state.movie) {
      movieElement = (
        <div>
          <Navigation movieTitle={this.state.movie.original_title} />
          <MovieInfo
            movie={this.state.movie}
            directors={this.state.directors}
          />
          <MovieInfoBar
            time={this.state.movie.runtime}
            revenue={this.state.movie.revenue}
            budget={this.state.movie.budget}
          />
        </div>
      );
    }

    if (this.state.actors) {
      actorsElement = (
        <div className="rmdb-movie-grid">
          <FourColGrid header="Actors">
            {this.state.actors.map((element, index) => {
              return <Actor key={index} actor={element} />;
            })}
          </FourColGrid>
        </div>
      );
    }

    return (
      <div className="rmdb-movie">
        {movieElement}
        {actorsElement}
        {!this.state.actors && !this.state.loading ? (
          <h1>No Movie Found</h1>
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
