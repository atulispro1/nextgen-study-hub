import { createContext, useContext, useState, useEffect, useRef } from "react";

const PomodoroContext = createContext();

// Session lengths in seconds (module-level so effects never list them as deps).
const FOCUS_TIME = 25 * 60;
const DEFAULT_BREAK_TIME = 5 * 60;

export function PomodoroProvider({ children }) {
  const [mode, setMode] = useState("focus");
  const [time, setTime] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);

  // Customizable break length (seconds). Lives in the context so the
  // auto-transition at zero uses the user's chosen duration — the old code
  // always overwrote it with the fixed 5 minutes.
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);

  // Keep the latest mode available inside the transition callback. The ref is
  // synced in an effect (writing refs during render is a React lint error).
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Single countdown interval — created once per run, not recreated every
  // second (the old effect listed `time` in its deps, churning the timer).
  useEffect(() => {
    if (!isRunning) return undefined;

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // When the countdown reaches zero, switch to the next session. The switch
  // is deferred one tick so setState never runs synchronously inside an
  // effect body (keeps react-hooks/set-state-in-effect happy).
  useEffect(() => {
    if (time > 0) return undefined;

    const nextMode = modeRef.current === "focus" ? "break" : "focus";
    const timeout = setTimeout(() => {
      setMode(nextMode);
      setTime(nextMode === "focus" ? FOCUS_TIME : breakTime);
    }, 0);

    return () => clearTimeout(timeout);
  }, [time, breakTime]);

  return (
    <PomodoroContext.Provider
      value={{
        mode,
        time,
        isRunning,
        setIsRunning,
        setTime,
        setMode,
        breakTime,
        setBreakTime,
        focusTime: FOCUS_TIME,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePomodoro = () => useContext(PomodoroContext);