// src/components/Timer.js
import { useEffect, useState } from "react";

const Timer = ({ isActive, gameOver, setTime, time }) => {

  useEffect(() => {
    let interval = null;
    if (isActive && !gameOver) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          setTime(newTime); // Report time to parent
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, gameOver, setTime]);

  return (
    <div className="timer">
      Time: {time} second{time !== 1 ? "s" : ""}
    </div>
  );
};

export default Timer;
