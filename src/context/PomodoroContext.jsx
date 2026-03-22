import { createContext, useContext, useState, useEffect } from "react";

const PomodoroContext = createContext();

export function PomodoroProvider({ children }) {
  const [mode, setMode] = useState("focus");
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const focusTime = 25 * 60;
  const breakTime = 5 * 60;

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time <= 0) {
      if (mode === "focus") {
        setMode("break");
        setTime(breakTime);
      } else {
        setMode("focus");
        setTime(focusTime);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, time, mode]);

  return (
    <PomodoroContext.Provider
      value={{
        mode,
        time,
        isRunning,
        setIsRunning,
        setTime,
        setMode,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export const usePomodoro = () => useContext(PomodoroContext);