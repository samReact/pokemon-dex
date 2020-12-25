import Home from "./pages/Home";
import { useQuery } from "@apollo/client";
import { POKEMONS } from "./gql/queries";
import { useDispatch } from "react-redux";
import { ADD_POKEMONS } from "./store/appActions";

function App() {
  const { loading, error, data } = useQuery(POKEMONS);
  const dispatch = useDispatch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    dispatch({ type: ADD_POKEMONS, payload: data.pokemons });
  }

  return <Home />;
}

export default App;
