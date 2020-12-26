import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import SearchInput from '../components/SearchInput';
import Drawer from '../parts/Drawer';
import Header from '../parts/Header';
import PokemonCard from '../parts/PokemonCard';

const Home = () => {

  const allPokemons = useSelector(state => state.pokemons);
  const [pokemons, setPokemons] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    setPokemons(allPokemons);
  }, [allPokemons]);

  const handleChange = (e) => {
    setValue(e.target.value);
    let value = e.target.value.replace(/\b\w/g, l => l.toUpperCase());
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.startsWith(value)
    );
    setPokemons(filteredPokemons);
  };

  const handleReset = () => {
    setPokemons(allPokemons);
    setValue('');
  };

  return (
    <div className='home'>
      <Header />
      <Drawer />
      <div className='home-content content-padding'>
        <div className='home-search'>
          <SearchInput placeholder={'Search by name'} value={value} onChange={handleChange} onClick={handleReset} />
        </div>
        <div className="home-grid">
          {pokemons.length > 0 ?
            pokemons.map(pokemon => {
              return (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              );
            })
            :
            <h5>No results</h5>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;