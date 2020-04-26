import React, { Component } from 'react';
import axios from 'axios';

import './Home.css';

import HeroImage from '../../components/HeroImage/HeroImage';
import SearchBar from '../../components/SearchBar/SearchBar';
import FourColGrid from '../../components/FourColGrid/FourColGrid';
import MovieThumb from '../../components/MovieThumb/MovieThumb';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../../components/Spinner/Spinner';
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE
} from '../../config';

import './Home.css';

class Home extends Component {
  state = {
    movies: [],
    heroImageValue: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: '',
    inputSearchValue: ''
  };

  componentDidMount() {
    if (sessionStorage.getItem('HomeState')) {
      const homeState = JSON.parse(sessionStorage.getItem('HomeState'));
      this.setState({ ...homeState });
    } else {
      this.setState({ loading: true });

      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      this.fetchItems(endpoint);
    }
  }

  searchItems = (searchTerm) => {
    let endpoint = '';

    this.setState({
      movies: [],
      loading: true,
      searchTerm: searchTerm
    });

    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }

    this.fetchItems(endpoint);
  };

  loadMoreItems = () => {
    let endpoint = '';

    this.setState({ loading: true });

    if (this.state.searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        this.state.currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }

    this.fetchItems(endpoint);
  };

  timeout = null;

  onSearchHandler = (event) => {
    this.setState({ inputSearchValue: event.target.value });

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.searchItems(this.state.inputSearchValue);
    }, 500);
  };

  fetchItems = (endpoint) => {
    axios
      .get(endpoint)
      .then((response) => {
        const data = response.data;
        const updatedMovies = [...this.state.movies, ...data.results];

        // const heroImageValue =
        //    this.state.heroImageValue === null
        //       ? data.results[0]
        //       : this.state.heroImageValue;

        this.setState(
          {
            movies: updatedMovies,
            heroImageValue: this.state.heroImageValue || data.results[0],
            loading: false,
            currentPage: data.page,
            totalPages: data.total_pages
          },
          () => {
            if (this.state.searchTerm === '') {
              sessionStorage.setItem('HomeState', JSON.stringify(this.state));
            }
          }
        );
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  render() {
    let homeElement = null;
    let loadMoreBtnElement = null;

    if (this.state.heroImageValue) {
      homeElement = (
        <div>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImageValue.backdrop_path}`}
            title={this.state.heroImageValue.original_title}
            text={this.state.heroImageValue.overview}
          />
          <SearchBar
            onSearchHandler={this.onSearchHandler}
            inputSearchValue={this.state.inputSearchValue}
          />
        </div>
      );
    }

    const movieElements = this.state.movies.map((element, index) => {
      return (
        <MovieThumb
          key={index}
          clickable={true}
          image={
            element.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
              : './images/no_image.jpg'
          }
          movieId={element.id}
          movieName={element.original_title}
        />
      );
    });

    if (
      this.state.currentPage <= this.state.totalPages &&
      !this.state.loading
    ) {
      loadMoreBtnElement = (
        <LoadMoreBtn text="Load More" clicked={this.loadMoreItems} />
      );
    }

    return (
      <div className="rmdb-home">
        {homeElement}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
            loading={this.state.loading}>
            {movieElements}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : null}
          {loadMoreBtnElement}
        </div>
      </div>
    );
  }
}

export default Home;
