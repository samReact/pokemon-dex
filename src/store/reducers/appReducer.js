import {
  ADD_POKEMONS,
  ADD_USER_TEAM,
  REMOVE_FROM_TEAM,
  TOGGLE_DRAWER,
} from "../actions/appActions";

const initialState = {
  pokemons: [],
  isDrawerOpen: false,
  pokemon: {},
  userTeam: [],
  played: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        pokemon: action.payload.pokemon,
        isDrawerOpen: action.payload.isDrawerOpen,
      };
    case REMOVE_FROM_TEAM:
      return {
        ...state,
        userTeam: action.payload,
      };
    case ADD_USER_TEAM:
      return {
        ...state,
        userTeam: action.payload,
      };
    default:
      return state;
  }
}
