import React, {useEffect} from 'react';
import {toast} from 'react-toastify';


import vsLogo from '../assets/VS_logo.png';

import {useDispatch, useSelector} from 'react-redux';
import {ADD_COMPUTER_TEAM, RESET_GAME} from '../store/actions/appActions';
import CustomButton from '../components/CustomButton';
import {useHistory} from 'react-router-dom';
import {SET_AVAILABLE_COMPUTER_FIGHTER, SET_AVAILABLE_USER_FIGHTER} from '../store/actions/gameActions';


const Game = () => {
  const state = useSelector(state => state.app);
  const {userTeam, pokemons, computerTeam, userDamage, computerDamage, played} = state;

  const dispatch = useDispatch();
  const history = useHistory();

  const notify = (text) => {
    toast.info(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      onClose: () => {
        dispatch({type: RESET_GAME});
        history.push("/");
      }
    });
  };

  const setComputerTeam = () => {
    const computerTeam = [];
    for (let i = 0; i < userTeam.length; i++) {
      let item = pokemons[Math.floor(Math.random() * pokemons.length)];
      computerTeam.push({...item, played: false});
    }
    dispatch({type: ADD_COMPUTER_TEAM, payload: computerTeam});
    dispatch({type: SET_AVAILABLE_COMPUTER_FIGHTER, payload: computerTeam});
    dispatch({type: SET_AVAILABLE_USER_FIGHTER, payload: userTeam});

  };

  const closeGame = () => {
    let message = '';
    if (userDamage === computerDamage) {
      message = "No winner ! ";
    }
    if (userDamage > computerDamage) {
      message = "Computer win !";
    }
    else {
      message = "you win !!";
    }

    return notify(message);
  };

  useEffect(() => {
    if (userTeam.length && pokemons.length && computerTeam.length === 0) {
      setComputerTeam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTeam, pokemons]);

  useEffect(() => {
    const availableFighterUser = userTeam.find(elt => elt.played === false);
    const availableFighterComputer = computerTeam.find(elt => elt.played === false);
    if (
      played
    ) {
      if (availableFighterComputer === undefined || availableFighterUser === undefined) {
        closeGame();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTeam, computerTeam]);

  const RenderListMembers = ({datas}) =>
    <div className="game-images-container">
      {datas.map(member => {
        const played = member.played;
        return (
          <div key={member.id} >
            <div key={member.id} className={`game-image-background ${played && `-disabled`}`}>
              <img src={member.image} alt={member.name} />
            </div>
            <h5 style={{textAlign: 'center', margin: 0, opacity: played ? 0.5 : 1}}>{member.name}</h5>
          </div>
        );
      })}
    </div>;


  return (
    <div className='game content-padding'>
      <div className="game-team-container">
        <h2>{userDamage}</h2>
        <h2>My Team</h2>
        <RenderListMembers datas={userTeam} />
      </div>
      <img src={vsLogo} alt="vs logo" />
      <div className="game-team-container">
        <h2>{computerDamage}</h2>
        <h2>Computer's Team</h2>
        <RenderListMembers datas={computerTeam} />
      </div>
      <CustomButton title={"Start"} pulse onClick={() => history.push("/fight")} />
    </div>
  );
};

export default Game;