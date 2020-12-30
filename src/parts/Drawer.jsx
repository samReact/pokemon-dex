import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_USER_TEAM, REMOVE_FROM_TEAM, TOGGLE_DRAWER} from '../store/actions/appActions';
import {toast} from 'react-toastify';
import useSound from 'use-sound';


import {useQuery} from "@apollo/client";
import {POKEMON} from '../gql/queries';
import Pills from '../components/Pills';
import CustomButton from '../components/CustomButton';
import addSound from '../assets/sounds/select.mp3';
import removeSound from '../assets/sounds/remove.mp3';

const Drawer = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.app);
  const {isDrawerOpen, pokemon, pokemons, userTeam} = state;

  const [evolutionsPokemon, setEvolutionsPokemon] = useState([]);

  const notify = (text) => {
    toast.info(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };

  const [addSoundActive] = useSound(
    addSound,
    {volume: 1}
  );

  const [removeSoundActive] = useSound(
    removeSound,
    {volume: 1}
  );

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

  const handleAddToTeam = () => {
    const filteredmyTeam = userTeam.filter(member => member.id !== data.pokemon.id);
    let fast = [...data.pokemon.attacks.fast];
    let special = [...data.pokemon.attacks.special];
    let pokemon = {...data.pokemon, attacks: {fast: fast.splice(0, 2), special: special.splice(0, 2)}};
    dispatch({type: ADD_USER_TEAM, payload: [...filteredmyTeam, {...pokemon, played: false}]});
    addSoundActive();
    notify('Added !');
  };

  const handleRemoveFromTeam = (id) => {
    let updatedTeam = userTeam;
    updatedTeam = updatedTeam.filter(pokemon => pokemon.id !== id);
    dispatch({type: REMOVE_FROM_TEAM, payload: updatedTeam});
    removeSoundActive();
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
                {userTeam.find(member => member.id === fetchedPokemon.id) ?
                  <CustomButton title={"Remove from my team"} type="danger" onClick={() => handleRemoveFromTeam(fetchedPokemon.id)} block />
                  :
                  <CustomButton title={"Add to my team"} type="success" onClick={() => handleAddToTeam(fetchedPokemon)} block disabled={userTeam.length >= 5} />
                }
              </div>

            </div>
        }
      </div>
    </div >
  );
};

export default Drawer;