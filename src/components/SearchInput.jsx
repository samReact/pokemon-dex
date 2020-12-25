import React from 'react';

import searchIcon from '../assets/search.svg';
import ClearButton from './ClearButton';

const SearchInput = (props) => {
  const {onChange, placeholder, onClick, value} = props;

  return (
    <div className="search-input">
      <span className="search-icon">
        <img src={searchIcon} alt="search icon" />
      </span>
      <input onChange={onChange} placeholder={placeholder} className='search-field' value={value} />
      {
        value.length > 0 &&
        <span className="search-clear">
          <ClearButton onClick={onClick} />
        </span>
      }
    </div>
  );
};

export default SearchInput;