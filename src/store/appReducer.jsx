import {ADD_POKEMONS, TOGGLE_DRAWER, UPDATE_TEAM} from './appActions';

const initialState = {
  pokemons: [],
  isDrawerOpen: false,
  pokemon: {},
  myTeam: []
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POKEMONS:
      return {
        ...state,
        pokemons: action.payload
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        pokemon: action.payload.pokemon,
        isDrawerOpen: action.payload.isDrawerOpen
      };
    case UPDATE_TEAM:
      return {
        ...state,
        myTeam: action.payload
      };
    default:
      return state;
  }
}