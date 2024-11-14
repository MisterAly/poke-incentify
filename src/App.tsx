import { useEffect, useState } from "react";
import "./App.css";
import { ApiRow, fetchAllKantoPokemon } from "./fetchers/getPokemon";
import {
  AppPkmnDetail,
  getAppPkmnDetailFromApi,
  getImageConfigFromType,
} from "./helpers";
import PokeInfo from "./components/PokeInfo";

function App() {
  const [pokemonCollection, setPokemonCollection] = useState<ApiRow[]>([]);
  const [selectedPkmn, setSelectedPkmn] = useState<AppPkmnDetail | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchPokemonList() {
      const response = await fetchAllKantoPokemon();
      const data = response;
      setPokemonCollection(data);
    }

    fetchPokemonList();
  }, []);

  async function handlePokemonSelect(url: string) {
    const response = await fetch(url);
    const apiDetail = await response.json();
    const appDetail: AppPkmnDetail = getAppPkmnDetailFromApi(apiDetail);
    setSelectedPkmn(appDetail);
  }

  const pkmnFirstType =
    !!selectedPkmn && (selectedPkmn.types.length ?? 0) > 0
      ? selectedPkmn.types[0]
      : "normal";

  const firstTypeImageConfig = getImageConfigFromType(pkmnFirstType);

  return (
    <>
      <div className="w-full h-full flex bg-[#FF4444] p-12 gap-6">
        <div
          className="flex flex-col bg-[#D5D5D5] border border-black p-3 gap-1 gap-2.5  max-h-screen overflow-y-auto"
          style={{ width: "30%" }}
        >
          {pokemonCollection?.map((pokemonRow) => (
            <div key={pokemonRow.url}>
              <button
                onClick={() => handlePokemonSelect(pokemonRow.url)}
                className="bg-[#E2E2E2] py-1 px-2 rounded w-full text-left"
              >
                <span className="font-normal text-xs capitalize">
                  {pokemonRow.name}
                </span>
              </button>
            </div>
          ))}
        </div>
        <div
          className="bg-[#FFF] border border-black px-5"
          style={{ width: "70%" }}
        >
          {selectedPkmn && (
            <div>
              <div className="flex align-center justify-center">
                <div
                  className="logo flex items-center justify-center w-[31.125rem] h-64 rounded-b-full overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(to right bottom, ${firstTypeImageConfig.color} 0%, ${firstTypeImageConfig.color}30 100%)`,
                  }}
                >
                  {/*using style directly is not really how I would normally go, but tailwind tools for gradient are not great haha*/}
                  <img
                    src={firstTypeImageConfig.vectorSrc}
                    alt="Pokemon background"
                    className=" w-[12.75rem] h-[12.75rem]"
                    style={{
                      transform: "scale(1.8)",
                      maskImage:
                        "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2))",
                    }}
                  />
                </div>
              </div>
              {/*I left this mb-10 here so bigger pokemons didn't overflowed the name when in mobile*/}
              <div className="flex items-center justify-center mb-6">
                <img
                  src={selectedPkmn.image}
                  className="absolute w-64 h-64 top-40"
                />
              </div>
              <PokeInfo selectedPkmn={selectedPkmn} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
