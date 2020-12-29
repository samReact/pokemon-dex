import React, {useEffect} from 'react';
import {toast} from 'react-toastify';


import vsLogo from '../assets/VS_logo.png';

import {useDispatch, useSelector} from 'react-redux';
import {RESET_GAME} from '../store/actions/appActions';
import CustomButton from '../components/CustomButton';
import {useHistory} from 'react-router-dom';
import {SET_AVAILABLE_COMPUTER_FIGHTER, SET_AVAILABLE_USER_FIGHTER} from '../store/actions/gameActions';


const Game = () => {
  const appState = useSelector(state => state.app);
  const gameState = useSelector(state => state.game);

  const {userTeam, pokemons, played} = appState;
  const {availableComputerFighters, availableUserFighters} = gameState;

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

  const setComputerFighterTeam = () => {
    const computerTeam = [];
    for (let i = 0; i < userTeam.length; i++) {
      let item = pokemons[Math.floor(Math.random() * pokemons.length)];
      computerTeam.push({...item, played: false});
    }
    dispatch({type: SET_AVAILABLE_COMPUTER_FIGHTER, payload: computerTeam});
  };

  const setUserFighterTeam = () => {
    dispatch({type: SET_AVAILABLE_USER_FIGHTER, payload: userTeam});
  };

  const closeGame = () => {
    let message = '';
    // if (userDamage === computerDamage) {
    //   message = "No winner ! ";
    // }
    // if (userDamage > computerDamage) {
    //   message = "Computer win !";
    // }
    // else {
    //   message = "you win !!";
    // }

    // return notify(message);
  };

  useEffect(() => {
    if (userTeam.length && pokemons.length && availableComputerFighters.length === 0) {
      setComputerFighterTeam();
      setUserFighterTeam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTeam, pokemons]);

  useEffect(() => {
    const availableFighterUser = availableUserFighters.find(elt => elt.played === false);
    const availableFighterComputer = availableComputerFighters.find(elt => elt.played === false);
    if (
      played
    ) {
      if (availableFighterComputer === undefined || availableFighterUser === undefined) {
        closeGame();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableUserFighters, availableComputerFighters]);

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
        <h2>My Team</h2>
        <RenderListMembers datas={availableUserFighters} />
      </div>
      <img src={vsLogo} alt="vs logo" />
      <div className="game-team-container">
        <h2>Computer's Team</h2>
        <RenderListMembers datas={availableComputerFighters} />
      </div>
      <CustomButton title={"Start"} pulse onClick={() => history.push("/fight")} />
    </div>
  );
};

export default Game;