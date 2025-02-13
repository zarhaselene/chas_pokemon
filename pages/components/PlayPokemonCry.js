import { useRef } from "react";
import { AiFillSound } from "react-icons/ai";
import { FaVolumeUp } from "react-icons/fa";

// Fix

const PlayPokemonCry = ({ name }) => {
  const audioRef = useRef(null);

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
        src={`https://play.pokemonshowdown.com/audio/cries/${name.replace("-","")}.mp3`}
      />
    </div>
  );
};

export default PlayPokemonCry;
