import React from 'react';

import logo from '../assets/logo-pokemon.png';
import FightButton from '../components/FightButton';

const Header = () => {

  return (
    <div className='header'>
      <img src={logo} alt="pokemon logo" />
      <FightButton />
    </div>
  );
};

export default Header;