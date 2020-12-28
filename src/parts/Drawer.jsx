import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_USER_TEAM, REMOVE_FROM_TEAM, TOGGLE_DRAWER} from '../store/appActions';
import {toast} from 'react-toastify';

import {useQuery} from "@apollo/client";
import {POKEMON} from '../gql/queries';
import Pills from '../components/Pills';
import CustomButton from '../components/CustomButton';

const Drawer = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {isDrawerOpen, pokemon, pokemons, myTeam} = state;

  const [evolutionsPokemon, setEvolutionsPokemon] = useState([]);

  const notify = (text) => {
    toast.info(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };

  const {loading, error, data} = useQuery(POKEMON, {
    variables: {id: pokemon.id},
  });

  let fetchedPokemon = {};

  if (data) {
    fetchedPokemon = data.pokemon;
  }
  useEffect(() => {
    if (fetchedPokemon.evolutions == null) {
      return setEvolutionsPokemon([]);
    }
    if (fetchedPokemon.evolutions) {
      const evolutions = fetchedPokemon.evolutions;
      const evolutionsPokemon = [];
      pokemons.map(pokemon => {
        return evolutions.map((evolution) => evolution.id === pokemon.id && evolutionsPokemon.push(pokemon));
      });
      setEvolutionsPokemon(evolutionsPokemon);
    }
  }, [fetchedPokemon.evolutions, pokemons]);

  const classname = isDrawerOpen ? 'drawer -open' : 'drawer';

  const handleClick = () => {
    dispatch({type: TOGGLE_DRAWER, payload: {isDrawerOpen: false, pokemon}});
  };

  const RenderPills = ({title, datas}) => {
    return (
      <div className="drawer-pills">
        <h5 >{title}</h5>
        <div className="drawer-pills-container">
          {
            loading ?
              <p>Loading...</p>
              :
              datas.map(weakness => <Pills key={weakness} title={weakness} type={weakness} />)
          }
        </div>
      </div>
    );
  };

  const handleAddToTeam = (pokemon) => {
    const filteredmyTeam = myTeam.filter(member => member.id !== pokemon.id);
    dispatch({type: ADD_USER_TEAM, payload: [...filteredmyTeam, {...pokemon, played: false}]});
    notify('Added !');
  };

  const handleRemoveFromTeam = (id) => {
    let updatedTeam = myTeam;
    updatedTeam = updatedTeam.filter(pokemon => pokemon.id !== id);
    dispatch({type: REMOVE_FROM_TEAM, payload: updatedTeam});
    notify('Removed !');
  };

  return (
    <div className={classname} >
      <div className="drawer-content">
        <span className="closebtn" onClick={handleClick} >
          X
        </span>
        {
          error ?
            <p>An error occur try again</p>
            :
            <div style={{visibility: isDrawerOpen ? "visible" : "hidden"}}>
              <div className="drawer-image-container">
                <img src={fetchedPokemon.image} alt={fetchedPokemon.name} />
              </div>
              <div className="drawer-name-container">
                <h5>{fetchedPokemon.name}</h5>
                <span >{fetchedPokemon.classification}</span>
              </div>
              <RenderPills title={'Weakness'} datas={fetchedPokemon.weaknesses} />
              <RenderPills title={'Resistant'} datas={fetchedPokemon.resistant} />

              {
                evolutionsPokemon.length > 0 &&
                <div className="drawer-evolutions-container">
                  <h5 >Evolutions</h5>
                  <div className="drawer-evolutions-image-container">
                    {evolutionsPokemon.map(evolution => {
                      return (
                        <div key={evolution.id} className="drawer-image-container -small">
                          <img src={evolution.image} alt={evolution.name} />
                        </div>
                      );
                    })
                    }
                  </div>
                </div>
              }
              <div style={{marginTop: 16}}>
                {myTeam.find(member => member.id === fetchedPokemon.id) ?
                  <CustomButton title={"Remove from my team"} type="danger" onClick={() => handleRemoveFromTeam(fetchedPokemon.id)} block />
                  :
                  <CustomButton title={"Add to my team"} type="success" onClick={() => handleAddToTeam(fetchedPokemon)} block disabled={myTeam.length >= 5} />
                }
              </div>

            </div>
        }
      </div>
    </div >
  );
};

export default Drawer;