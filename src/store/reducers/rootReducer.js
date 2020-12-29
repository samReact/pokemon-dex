import { combineReducers } from "redux";
import app from "./appReducer";
import game from "./gameReducer";

const rootReducer = combineReducers({
  app,
  game,
});

export default rootReducer;
