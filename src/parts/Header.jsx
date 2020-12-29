import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';



import logo from '../assets/logo-pokemon.png';
import CustomButton from '../components/CustomButton';

const Header = ({userTeam}) => {
  let history = useHistory();
  let location = useLocation();
  const {pathname} = location;

  const notify = (text) => {
    toast.info(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };

  const handleClick = () => {
    if (userTeam.length < 3) {
      return notify("Select at least 3 fighters !");
    }
    if (userTeam.length > 5) {
      return notify("Maximum 5 fighters !");
    }
    history.push("/game");
  };

  return (
    <div className='header content-padding'>
      <img src={logo} alt="pokemon logo" className="header-logo" onClick={() => history.push("/")} />
      {
        pathname === '/' &&
        <CustomButton title='Fight !' pulse onClick={handleClick} />
      }
    </div>
  );
};

export default Header;