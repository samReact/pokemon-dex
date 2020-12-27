import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';


import logo from '../assets/logo-pokemon.png';
import CustomButton from '../components/CustomButton';

const Header = ({myTeam}) => {
  let history = useHistory();
  let location = useLocation();
  const {pathname} = location;

  const handleClick = () => {
    if (myTeam.length < 1) {
      return alert("Select at least 3 fighters !");
    }
    if (myTeam.length > 5) {
      return alert("Maximum 5 fighters !");
    }
    history.push("/game");
  };

  return (
    <div className='header content-padding'>
      <img src={logo} alt="pokemon logo" className="header-logo" onClick={() => history.push("/")} />
      {
        pathname !== '/game' &&
        <CustomButton title='Fight !' pulse onClick={handleClick} />

      }
    </div>
  );
};

export default Header;