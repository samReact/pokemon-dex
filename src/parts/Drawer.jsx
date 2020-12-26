import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TOGGLE_DRAWER} from '../store/appActions';

const Drawer = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(state => state.isDrawerOpen);
  const classname = isDrawerOpen ? 'drawer -open' : 'drawer';

  const handleClick = () => {
    dispatch({type: TOGGLE_DRAWER, payload: false});
  };

  return (
    <div className={classname} >
      <span className="closebtn" onClick={handleClick} >
        X
        </span>
    </div >
  );
};

export default Drawer;