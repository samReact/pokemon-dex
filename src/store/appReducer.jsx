import {ADD_COMPUTER_TEAM, ADD_POKEMONS, ADD_TO_TEAM, REMOVE_FROM_TEAM, SET_COMPUTER_FIGHTER, TOGGLE_DRAWER} from './appActions';

const initialState = {
  pokemons: [],
  isDrawerOpen: false,
  pokemon: {},
  myTeam: [],
  computerTeam: [],
  computerFighter: {},
  myTeamFighter: {}
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
    case ADD_COMPUTER_TEAM:
      return {
        ...state,
        computerTeam: action.payload
      };
    case SET_COMPUTER_FIGHTER:
      return {
        ...state,
        computerFighter: action.payload
      };
    default:
      return state;
  }
}