import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const Home = () => {
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const intervalIdRef = useRef<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Start the timer
    intervalIdRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Reset the timer if the user moves their mouse or presses a key
    const resetTimer = () => {
      setTimer(120);
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Cleanup
    return () => {
      clearInterval(intervalIdRef.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  useEffect(() => {
    
    if (timer % 120 === 0) {

        setMessage("ok lets go")
    }
    else if (timer % 6 === 0) {

        setMessage("6")
    }
    else if (timer % 7 === 0) {

        setMessage("7")
    }
    else if (timer % 8 === 0) {

        setMessage("8")
    }
    else if (timer % 9 === 0) {

        setMessage("9")
    }
    else if (timer % 10 === 0) {

        setMessage("10")
    }
  }, [timer]);


  // Format the timer value as MM:SS
  const formattedTime = new Date(timer * 1000).toISOString().substr(14, 5);

  return <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>

    <p>Do nothing for 2 min</p>
    <p>{formattedTime}</p>
    <p>{message}</p>
    
    </Box>
};
