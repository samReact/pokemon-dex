import React from 'react';
import {useSelector} from 'react-redux';

import Drawer from '../parts/Drawer';
import Header from '../parts/Header';

const Root = ({children}) => {

  const state = useSelector(state => state);
  const {myTeam} = state;



  return (
    <div>
      <Header myTeam={myTeam} />
      <Drawer />
      {children}
    </div>
  );
};

export default Root;