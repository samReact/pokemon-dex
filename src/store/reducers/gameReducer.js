import {
  SET_AVAILABLE_COMPUTER_FIGHTER,
  SET_AVAILABLE_USER_FIGHTER,
  SET_COMPUTER_HEALTH,
  SET_USER_HEALTH,
  SET_USER_USED_ATTACKS,
  SET_COMPUTER_USED_ATTACKS,
  TOGGLE_GAME_TURN,
  INCREMENT_COMPUTER_SCORE,
  INCREMENT_USER_SCORE,
  NEXT_TURN,
} from "../actions/gameActions";

const initialState = {
  availableUserFighters: [],
  availableComputerFighters: [],
  userHealth: 100,
  computerHealth: 100,
  isUserTurn: true,
  computerUsedAttacks: [],
  userUsedAttacks: [],
  computerScore: 0,
  userScore: 0,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AVAILABLE_USER_FIGHTER:
      return {
        ...state,
        availableUserFighters: action.payload,
      };
    case SET_AVAILABLE_COMPUTER_FIGHTER:
      return {
        ...state,
        availableComputerFighters: action.payload,
      };
    case TOGGLE_GAME_TURN:
      return {
        ...state,
        isUserTurn: !state.isUserTurn,
      };
    case SET_USER_HEALTH:
      return {
        ...state,
        userHealth: state.userHealth - action.payload,
      };
    case SET_COMPUTER_HEALTH:
      return {
        ...state,
        computerHealth: state.computerHealth - action.payload,
      };
    case SET_USER_USED_ATTACKS:
      const updatedUsedAttacks = [...state.userUsedAttacks];
      updatedUsedAttacks.push(action.payload);
      return {
        ...state,
        userUsedAttacks: updatedUsedAttacks,
      };
    case SET_COMPUTER_USED_ATTACKS:
      const updatedComputerUsedAttacks = [...state.computerUsedAttacks];
      updatedComputerUsedAttacks.push(action.payload);
      return {
        ...state,
        computerUsedAttacks: updatedComputerUsedAttacks,
      };
    case INCREMENT_COMPUTER_SCORE:
      return {
        ...state,
        computerScore: state.computerScore + 1,
      };
    case INCREMENT_USER_SCORE:
      return {
        ...state,
        userScore: state.userScore + 1,
      };
    case NEXT_TURN:
      const updatedComputerFighters = state.availableComputerFighters;
      updatedComputerFighters.pop();

      const updatedUserFighters = state.availableUserFighters;
      updatedUserFighters.pop();
      return {
        ...state,
        availableComputerFighters: updatedComputerFighters,
        availableUserFighters: updatedUserFighters,
      };
    default:
      return state;
  }
}
