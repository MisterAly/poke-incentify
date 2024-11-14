type PokeSecsTypes = {
  title: string;
  attribute: string;
  unity?: string;
  icon: string;
};

const PokeSpecs = ({ title, attribute, unity, icon }: PokeSecsTypes) => {
  return (
    <div className="w-[9.625rem]">
      <div className="flex gap-1.5 items-center">
        <img src={icon} alt="Weight Icon" />
        <span className="text-xs uppercase text-left opacity-60">{title}</span>
      </div>
      <div className="flex flex-col border solid-black px-4 py-1 justify-between rounded-[0.938rem] mt-[0.313rem]">
        <span className="text-lg capitalize">
          {attribute} {unity}
        </span>
      </div>
    </div>
  );
};

export default PokeSpecs;
