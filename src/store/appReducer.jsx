import {ADD_POKEMONS, ADD_TO_TEAM, REMOVE_FROM_TEAM, TOGGLE_DRAWER} from './appActions';

const initialState = {
  pokemons: [],
  isDrawerOpen: false,
  pokemon: {},
  myTeam: [],
  computerTeam: []
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
    case ADD_TO_TEAM:
      return {
        ...state,
        myTeam: [...state.myTeam, action.payload]
      };
    case REMOVE_FROM_TEAM:
      return {
        ...state,
        myTeam: action.payload
      };
    default:
      return state;
  }
}