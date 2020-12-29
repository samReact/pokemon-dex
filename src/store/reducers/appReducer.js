import {
  ADD_COMPUTER_TEAM,
  ADD_POKEMONS,
  ADD_USER_TEAM,
  REMOVE_FROM_TEAM,
  RESET_GAME,
  TOGGLE_DRAWER,
  UPDATE_GAME_SCORE,
} from "../actions/appActions";

const initialState = {
  pokemons: [],
  isDrawerOpen: false,
  pokemon: {},
  userTeam: [],
  computerTeam: [],
  computerDamage: 0,
  userDamage: 0,
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
    case ADD_COMPUTER_TEAM:
      return {
        ...state,
        computerTeam: action.payload,
      };
    case ADD_USER_TEAM:
      return {
        ...state,
        userTeam: action.payload,
      };
    case UPDATE_GAME_SCORE:
      return {
        ...state,
        played: true,
        computerDamage: action.payload.computerDamage,
        userDamage: action.payload.userDamage,
      };
    case RESET_GAME:
      return {
        ...state,
        computerDamage: 0,
        userDamage: 0,
        played: false,
        userTeam: [],
        computerTeam: [],
      };
    default:
      return state;
  }
}
