import React from 'react';
import {useSelector} from 'react-redux';

import Header from '../parts/Header';

const Root = ({children}) => {

  const state = useSelector(state => state);
  const {myTeam} = state;



  return (
    <div style={{minHeight: '100vh'}}>
      <Header myTeam={myTeam} />
      {children}
    </div>
  );
};

export default Root;