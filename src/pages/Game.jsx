import React from 'react';

import Root from '../parts/Root';
import vsLogo from '../assets/VS_logo.png';

const Game = () => {


  return (
    <Root>
      <div className='game content-padding'>
        <img src={vsLogo} alt="vs logo" />
      </div>
    </Root>
  );
};

export default Game;