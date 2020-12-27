import React from 'react';

import logo from '../assets/logo-pokemon.png';
import CustomButton from '../components/CustomButton';

const Header = ({myTeam}) => {

  const handleClick = () => {
    if (myTeam.length < 1) {
      alert("Select at least 3 fighters !");
    }
    if (myTeam.length > 5) {
      alert("Maximum 5 fighters !");
    }
  };

  return (
    <div className='header content-padding'>
      <img src={logo} alt="pokemon logo" />
      <CustomButton title='Fight !' pulse onClick={handleClick} />
    </div>
  );
};

export default Header;