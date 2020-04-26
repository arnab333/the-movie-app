import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
   return (
      <div className="rmdb-header">
         <div className="rmdb-header-content">
            <Link to="/">
               <img
                  className="rmdb-logo-icon"
                  src="./images/film-256.png"
                  alt="movie icon"
               />
               <img
                  className="rmdb-logo"
                  src="./images/logo2.png"
                  alt="movie logo"
               />
            </Link>
            <img
               className="rmdb-tmdb-logo"
               src="./images/tmdb_logo.png"
               alt="tmdb logo"
            />
         </div>
      </div>
   );
};

export default Header;
