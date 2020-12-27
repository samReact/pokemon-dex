import Home from "./pages/Home";
//appolo
import { useQuery } from "@apollo/client";
import { POKEMONS } from "./gql/queries";
//global state
import { useDispatch } from "react-redux";
import { ADD_POKEMONS } from "./store/appActions";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Game from "./pages/Game";

function App() {
  const { loading, error, data } = useQuery(POKEMONS);
  const dispatch = useDispatch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    dispatch({ type: ADD_POKEMONS, payload: data.pokemons });
  }

  return (
    <Router>
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
