import Home from "./pages/Home";
//appolo
import { useQuery } from "@apollo/client";
import { POKEMONS } from "./gql/queries";
//global state
import { useDispatch } from "react-redux";
import { ADD_POKEMONS } from "./store/actions/appActions";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Game from "./pages/Game";
import Root from "./parts/Root";
import Fight from "./pages/Fight";

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
      <Root>
        <Switch>
          <Route path="/fight">
            <Fight />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Root>
    </Router>
  );
}

export default App;
