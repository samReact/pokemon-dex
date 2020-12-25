import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../parts/Header';

const Home = () => {

  const pokemons = useSelector(state => state.pokemons);
  console.log(pokemons);
  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;