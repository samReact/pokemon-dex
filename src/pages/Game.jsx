import React, {useEffect} from 'react';

import Root from '../parts/Root';
import vsLogo from '../assets/VS_logo.png';

import {useDispatch, useSelector} from 'react-redux';
import {ADD_COMPUTER_TEAM} from '../store/appActions';
import CustomButton from '../components/CustomButton';


const Game = () => {
  const state = useSelector(state => state);
  const {myTeam, pokemons, computerTeam} = state;

  const dispatch = useDispatch();



  const getComputerTeam = () => {
    const computerTeam = [];
    for (let i = 0; i < myTeam.length; i++) {
      let item = pokemons[Math.floor(Math.random() * pokemons.length)];
      computerTeam.push(item);
    }
    dispatch({type: ADD_COMPUTER_TEAM, payload: computerTeam});
  };

  useEffect(() => {
    if (myTeam.length && pokemons.length) {
      getComputerTeam();
    }
  }, [myTeam, pokemons]);

  const RenderListMembers = ({datas}) =>
    <div className="game-images-container">
      {datas.map(member => (
        <div key={member.id} >
          <div key={member.id} className="game-image-background">
            <img src={member.image} alt={member.name} />
          </div>
          <h5 style={{textAlign: 'center', margin: 0}}>{member.name}</h5>
        </div>
      ))}
    </div>;


  return (
    <Root>
      <div className='game content-padding'>
        <div className="game-team-container">
          <h2>My Team</h2>
          <RenderListMembers datas={myTeam} />
        </div>
        <img src={vsLogo} alt="vs logo" />
        <div className="game-team-container">
          <h2>Computer's Team</h2>
          <RenderListMembers datas={computerTeam} />
        </div>
        <CustomButton title={"Start"} pulse />
      </div>
    </Root>
  );
};

export default Game;