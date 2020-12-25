import React from 'react';

import clearIcon from '../assets/clear.svg';


const ClearButton = (props) => {
  const {onClick} = props;

  return (
    <button className='btn-clear' onClick={onClick}>
      <img src={clearIcon} alt="clear icon" />
    </button>
  );
};

export default ClearButton;