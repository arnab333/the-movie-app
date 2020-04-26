import React from 'react';
import { Link } from 'react-router-dom';

import './MovieThumb.css';

const MovieThumb = (props) => {
   let movieThumbElement = <img src={props.image} alt="moviethumb" />;

   if (props.clickable) {
      movieThumbElement = (
         <Link to={`/${props.movieId}`}>
            <img src={props.image} alt="moviethumb" />
         </Link>
      );
   }

   return <div className="rmdb-moviethumb">{movieThumbElement}</div>;
};

export default MovieThumb;
