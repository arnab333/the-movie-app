import React from 'react';
import FontAwesome from 'react-fontawesome';

import './SearchBar.css';

const SearchBar = (props) => {
   return (
      <div className="rmdb-searchbar">
         <div className="rmdb-searchbar-content">
            <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
            <input
               type="text"
               className="rmdb-searchbar-input"
               placeholder="Search"
               onChange={props.onSearchHandler}
               value={props.inputSearchValue}
            />
         </div>
      </div>
   );
};

export default SearchBar;
