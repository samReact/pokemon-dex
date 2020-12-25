import {ADD_POKEMONS} from './appActions';

const initialState = {
  pokemons: []
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POKEMONS:
      return {
        ...state,
        pokemons: action.payload
      };
    default:
      return state;
  }
}