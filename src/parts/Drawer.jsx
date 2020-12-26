import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TOGGLE_DRAWER} from '../store/appActions';

import {useQuery} from "@apollo/client";
import {POKEMON} from '../gql/queries';

const Drawer = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {isDrawerOpen, pokemon} = state;

  const {loading, error, data} = useQuery(POKEMON, {
    variables: {id: pokemon.id},
  });

  let fetchedPokemon = {};

  if (data) {
    fetchedPokemon = data.pokemon;
  }


  const classname = isDrawerOpen ? 'drawer -open' : 'drawer';

  const handleClick = () => {
    dispatch({type: TOGGLE_DRAWER, payload: {isDrawerOpen: false, pokemon}});
  };
  console.log(fetchedPokemon);
  return (
    <div className={classname} >
      <div className="drawer-content">

        <span className="closebtn" onClick={handleClick} >
          X
        </span>
        <div className="drawer-image-container">
          <img src={fetchedPokemon.image} alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />
        </div>
      </div>
    </div >
  );
};

export default Drawer;