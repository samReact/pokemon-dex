import {
  SET_AVAILABLE_COMPUTER_FIGHTER,
  SET_AVAILABLE_USER_FIGHTER,
} from "../actions/gameActions";

const initialState = {
  availableUserFighters: [],
  availableComputerFighters: [],
  userHealth: 100,
  computerHealth: 100,
  turn: "user",
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

    default:
      return state;
  }
}
