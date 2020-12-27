import React, {useEffect, useState} from 'react';

import Root from '../parts/Root';
import vsLogo from '../assets/VS_logo.png';

import {useSelector} from 'react-redux';


const Game = () => {
  const [computerTeam, setComputerTeam] = useState([]);
  const myTeam = useSelector(state => state.myTeam);
  const allPokemons = useSelector(state => state.pokemons);



  const getComputerTeam = () => {
    const computerTeam = [];
    for (let i = 0; i < myTeam.length; i++) {
      let item = allPokemons[Math.floor(Math.random() * allPokemons.length)];
      computerTeam.push(item);
    }
    setComputerTeam(computerTeam);
  };

  useEffect(() => {
    if (myTeam.length) {
      getComputerTeam();
    }
  }, [myTeam]);

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
      </div>
    </Root>
  );
};

export default Game;