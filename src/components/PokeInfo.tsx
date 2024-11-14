import PokeSpecs from "./PokeSpecs";

import weightIcon from "../assets/information-icons/weight.svg";
import heightIcon from "../assets/information-icons/height.svg";
import speciesIcon from "../assets/information-icons/species.svg";
import abilityIcon from "../assets/information-icons/ability.svg";
import { AppPkmnDetail, getImageConfigFromType } from "../helpers";

interface PokeInfoProps {
  selectedPkmn: AppPkmnDetail;
}

const PokeInfo = ({ selectedPkmn }: PokeInfoProps) => {
  return (
    <div className="px-2.5 py-[0.313rem]">
      {/*i removed line height in here to fit the figma design, but keep in mind names like Ivysour will kinda go over it*/}
      <div className="flex flex-col text-left my-2.5 leading-none">
        <span className="text-left  text-[2rem] capitalize">
          {selectedPkmn.name}
        </span>
        <span className="opacity-70">
          {/*this is a simple js func so we can display it like figma, always 3 numbers like "#001" instead of "#1"*/}
          #{String(selectedPkmn.id).padStart(3, "0")}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mt-5">
        {selectedPkmn.types.map((type) => {
          const typeImageConfig = getImageConfigFromType(type);
          return (
            <div
              key={type}
              className="flex items-center justify-center rounded-3xl pr-3.5 pl-2 "
              style={{ backgroundColor: typeImageConfig.color }}
            >
              <img
                src={typeImageConfig.pngSrc}
                alt={type}
                className="w-7 h-7"
              />
              <span className="capitalize text-sm pl-1">{type}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-5 mt-5">
        {/*created a component to reutilize some styling*/}
        <PokeSpecs
          icon={weightIcon}
          title="Weight"
          attribute={selectedPkmn.weight.toString()}
          unity="Kg"
        />
        <PokeSpecs
          icon={heightIcon}
          title="Height"
          attribute={selectedPkmn.height.toString()}
          unity="M"
        />
        <PokeSpecs
          icon={speciesIcon}
          title="Species"
          attribute={selectedPkmn.species}
        />
        <PokeSpecs
          icon={abilityIcon}
          title="Ability"
          attribute={selectedPkmn.ability}
        />
      </div>
    </div>
  );
};

export default PokeInfo;
