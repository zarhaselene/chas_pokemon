import { SiPokemon } from "react-icons/si";

const Hero = ({ title, subtitle, image, children }) => {
  return (
    <>
      <div className="flex flex-col text-white text-center mb-4 bg-red-500 pb-12 items-center gap-2">
        <div className="flex items-center flex-col justify-center relative">
          <SiPokemon size={200} className="text-center top-4 text-white" />
          <img
            src={image}
            alt="Hero Image"
            width="126"
            height="126"
            className="max-w-[280px] bg-transparent md:absolute md:right-[-140px] md:top-[20px]"
          />
        </div>
        <h1 className="font-extrabold tracking-tight sm:text-5xl md:text-6xl text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl">
          {subtitle}
        </p>
        {children}
      </div>
    </>
  );
};

export default Hero;
