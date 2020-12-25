import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../parts/Header';
import PokemonCard from '../parts/PokemonCard';

const Home = () => {

  const pokemons = useSelector(state => state.pokemons);
  return (
    <div className='home'>
      <Header />
      <div className='home-content content-padding'>
        <div className="home-grid">
          {
            pokemons.map(pokemon => {
              return (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Home;