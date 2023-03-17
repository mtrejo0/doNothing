import { Box, Button, Menu, Slider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const Home = () => {
  const [totalTime, setTotalTime] = useState(120);
  const [timer, setTimer] = useState(totalTime); // 2 minutes in seconds
  const intervalIdRef = useRef<any>(null);
  const [message, setMessage] = useState("");
  const [breatheInTime, setBreatheInTime] = useState(4);
  const [holdTime, setHoldTime] = useState(7);
  const [breatheOutTime, setBreatheOutTime] = useState(8);

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
  };
  useEffect(() => {
    // Start the timer
    intervalIdRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Reset the timer if the user moves their mouse or presses a key
    const resetTimer = () => {
      setTimer(totalTime);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Cleanup
    return () => {
      clearInterval(intervalIdRef.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [totalTime]);

  useEffect(() => {
    const secondsElapsed = totalTime - timer;
    const totalCycleSeconds = breatheInTime + holdTime + breatheOutTime;
    const cycleSecondsElapsed = secondsElapsed % totalCycleSeconds;

    let message = "";
    if (cycleSecondsElapsed < breatheInTime) {
      message = `Breathe in for ... ${breatheInTime - cycleSecondsElapsed}`;
    } else if (cycleSecondsElapsed < breatheInTime + holdTime) {
      message = `Hold breath for ... ${
        breatheInTime + holdTime - cycleSecondsElapsed
      }`;
    } else {
      message = `Breathe out for ... ${
        totalCycleSeconds - cycleSecondsElapsed
      }`;
    }
    setMessage(message);
  }, [
    timer,
    intervalIdRef,
    breatheInTime,
    breatheOutTime,
    holdTime,
    totalTime,
  ]);

  // Format the timer value as MM:SS
  const formattedTime = new Date(timer * 1000).toISOString().substr(14, 5);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/images/sunset-shimmer-sunsets.gif"}
        alt="background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: "1",
        }}
      >
        <Typography>Do nothing for 2 min</Typography>
        <br></br>
        <Typography>{formattedTime}</Typography>
        <br></br>
        <Typography>{message}</Typography>
        <br></br>

        <Button onClick={handleButtonClick}>
          {play ? "Pause" : "Play"} Waves
        </Button>

        <Button onClick={handleOpen}>Settings</Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box sx={{ margin: "32px" }}>
            <Typography>Total Time: {totalTime} seconds</Typography>
            <Slider
              value={totalTime}
              onChange={(event, newValue) => setTotalTime(newValue as number)}
              min={30}
              max={600}
              step={1}
            />
            <Typography>Breathe In Time: {breatheInTime} seconds</Typography>
            <Slider
              value={breatheInTime}
              onChange={(event, newValue) =>
                setBreatheInTime(newValue as number)
              }
              min={1}
              max={10}
              step={1}
            />
            <Typography>Hold Time: {holdTime} seconds</Typography>
            <Slider
              value={holdTime}
              onChange={(event, newValue) => setHoldTime(newValue as number)}
              min={1}
              max={10}
              step={1}
            />
            <Typography>Breathe Out Time: {breatheOutTime} seconds</Typography>
            <Slider
              value={breatheOutTime}
              onChange={(event, newValue) =>
                setBreatheOutTime(newValue as number)
              }
              min={1}
              max={10}
              step={1}
            />
          </Box>
        </Menu>
      </Box>
      <Button
        sx={{ position: "absolute", bottom: "16px" }}
        onClick={() => {
          window.location.href = "https://forms.gle/HTLMazK7GP8CkNfk9";
        }}
      >
        Remind me!
      </Button>
    </Box>
  );
};
