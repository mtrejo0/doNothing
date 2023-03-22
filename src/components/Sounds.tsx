import { Button } from "@mui/material";
import { useState } from "react";

export const Sounds = () => {
  const [audio] = useState(new Audio(process.env.PUBLIC_URL + "waves.mp3"));
  const [play, setPlay] = useState(false);

  const handleButtonClick = () => {
    audio.volume = 0.5;
    

    if (play) {
      audio.pause();
      setPlay(false);
    } else {
      audio.loop = true;
      audio.play();
      setPlay(true);
    }

     // Reset the audio to the beginning if it's already playing
     if (audio.currentTime > 0) {
      audio.currentTime = 0;
    }
  };

  return (
   
  <Button onClick={handleButtonClick} variant={"outlined"} >
    {play ? "Pause" : "Play"} Waves
  </Button>

  );
};
