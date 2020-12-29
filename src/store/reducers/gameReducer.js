const initialState = {
  availableUserAttacks: [],
  availableComputerAttacks: [],
  userHealth: 100,
  computerHealth: 100,
  turn: 'user'
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}