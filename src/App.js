import Home from "./pages/Home";
import { useQuery } from "@apollo/client";
import { POKEMONS } from "./gql/queries";

function App() {
  const { loading, error, data } = useQuery(POKEMONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) console.log(data);
  return <Home />;
}

export default App;
