import { gql } from "@apollo/client";

export const POKEMONS = gql`
  query GetPokemons {
    pokemons(first: 151) {
      id
      name
    }
  }
`;
