import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import SearchInput from '../components/SearchInput';
import Drawer from '../parts/Drawer';
import PokemonCard from '../parts/PokemonCard';
import {RESET_GAME} from '../store/actions/gameActions';

const Home = () => {

  const state = useSelector(state => state.app);
  const dispatch = useDispatch();

  const allPokemons = state.pokemons;
  const {userTeam} = state;

  const [pokemons, setPokemons] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    setPokemons(allPokemons);
  }, [allPokemons]);

  useEffect(() => {
    dispatch({type: RESET_GAME});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <>
      <Drawer />
      <div className='home-content content-padding'>
        <div className='home-search'>
          <SearchInput placeholder={'Search by name'} value={value} onChange={handleChange} onClick={handleReset} />
        </div>
        <div className="home-grid">
          {pokemons.length > 0 ?
            pokemons.map(pokemon => {
              return (
                <PokemonCard key={pokemon.id} pokemon={pokemon} userTeam={userTeam} />
              );
            })
            :
            <h5>No results</h5>
          }
        </div>
      </div>
    </>
  );
};

export default Home;