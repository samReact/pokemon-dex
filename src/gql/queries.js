import { gql } from "@apollo/client";

export const POKEMONS = gql`
  query GetPokemons {
    pokemons(first: 151) {
      id
      name
      image
    }
  }
`;

export const POKEMON = gql`
  query GetPokemon($id: String) {
    pokemon(id: $id) {
      id
      name
      image
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      evolutions {
        id
      }
      evolutionRequirements {
        amount
        name
      }
      maxHP
    }
  }
`;
