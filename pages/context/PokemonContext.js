import {createContext, useContext, useState, useEffect} from "react";

// Context for the Pokemon data and search functionality
// The context provides the search input, search results, Pokemon data, loading state, and filtered Pokemon
// The context also stores the Pokemon data in localStorage
const PokemonContext = createContext();

export function PokemonProvider({children}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    let hasFetched = false;

    // Kolla om vi redan har Pokémon sparade i localStorage
    const storedPokemons = localStorage.getItem("pokemons");

    if (storedPokemons) {
      setPokemons(JSON.parse(storedPokemons));
      setLoading(false);
      return; // Avbryt fetch om vi redan har data
    }

    async function fetchPokemons() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0",
          {signal: controller.signal}
        );

        if (!response.ok) throw new Error("Failed to fetch Pokémon data");
        hasFetched = true;

        const data = await response.json();
        const pokemonsList = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url, {
              signal: controller.signal,
            });
            if (!pokemonResponse.ok)
              throw new Error("Failed to fetch Pokémon details");

            const pokemonDetails = await pokemonResponse.json();
            return {
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`,
              types: pokemonDetails.types.map((type) => type.type.name),
            };
          })
        );

        if (isMounted) {
          setPokemons(pokemonsList);
          localStorage.setItem("pokemons", JSON.stringify(pokemonsList)); // Spara i localStorage
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching Pokémon data:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPokemons();

    return () => {
      isMounted = false;
      if (hasFetched) controller.abort();
    };
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const nameMatch = pokemon.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const idMatch = pokemon.id.toString().includes(searchInput);
    return nameMatch || idMatch;
  });

  useEffect(() => {
    if (searchInput.length > 0) {
      setSearchResults(
        pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  }, [searchInput, pokemons]);

  return (
    <PokemonContext.Provider
      value={{
        searchInput,
        setSearchInput,
        searchResults,
        pokemons,
        loading,
        filteredPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export const usePokemon = () => useContext(PokemonContext);
