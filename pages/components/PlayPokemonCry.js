import {useRef} from "react";
import {AiFillSound} from "react-icons/ai";
import {FaVolumeUp} from "react-icons/fa";

// Audio player for the pokemon cry

const PlayPokemonCry = ({name}) => {
  const audioRef = useRef(null);

  {
    console.log("hello world");
  }

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="p-4">
      <FaVolumeUp className="text-xl" onClick={handlePlay} />
      <audio
        ref={audioRef}
        src={`https://play.pokemonshowdown.com/audio/cries/${name.replace(
          "-",
          ""
        )}.mp3`}
      />
    </div>
  );
};

export default PlayPokemonCry;
