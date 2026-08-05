import { useEffect, useRef } from "react";
import { usePomodoro } from "../context/PomodoroContext";


export default function PomodoroTimer() {
    const {
        mode,
        time,
        isRunning,
        setIsRunning,
        setTime,
        setMode,
        breakTime,
        setBreakTime,
        focusTime,
    } = usePomodoro();

    const audioRef = useRef(null);

    // Declared before the effects below that call them.
    // INIT AUDIO (user interaction)
    function initAudio() {
        if (!audioRef.current) {
            const audio = new Audio("/sounds/alarm.mp3"); // 🔥 LOCAL FILE
            audio.loop = true;
            audio.volume = 0.4;

            audioRef.current = audio;
        }
    }

    // PLAY
    function startAlarm() {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
                console.error("Audio error:", err);
            });
        }
    }

    // STOP
    function stopAlarm() {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }



    // NOTE: the countdown interval lives in PomodoroContext. PomodoroTimer
    // must NOT run its own interval, otherwise time decrements twice per
    // second and the timer runs at 2x speed.

    // Plays the alarm when a session ends. The mode/time switch itself is
    // handled by PomodoroContext (single source of truth), which uses the
    // user's customized break duration.
    useEffect(() => {
        if (time > 0) return;

        startAlarm();
    }, [time]);

    // Throttle localStorage writes: persist immediately when the mode or run
    // state changes, but at most every 10s for the per-second tick writes.
    // lastUpdated keeps restores accurate within the throttle window.
    const lastSavedRef = useRef({ mode: null, isRunning: null, at: 0 });

    useEffect(() => {
        const prev = lastSavedRef.current;
        const stateChanged =
            prev.mode !== mode || prev.isRunning !== isRunning;
        const shouldSave = stateChanged || Date.now() - prev.at >= 10000;

        if (!shouldSave) return;

        try {
            localStorage.setItem(
                "pomodoro",
                JSON.stringify({
                    mode,
                    time,
                    isRunning,
                    lastUpdated: Date.now(),
                })
            );
        } catch {
            // storage unavailable (private mode / quota) — ignore
        }

        lastSavedRef.current = { mode, isRunning, at: Date.now() };
    }, [mode, time, isRunning]);
    // Restore the saved session once on mount only — the persisted values are
    // the source of truth for the initial state. The context setters are
    // stable (useState), so listing them keeps this running exactly once.
    useEffect(() => {
        let saved = null;

        try {
            saved = JSON.parse(localStorage.getItem("pomodoro"));
        } catch {
            saved = null;
        }

        if (saved) {
            const now = Date.now();
            const diff = Math.floor((now - saved.lastUpdated) / 1000);

            let newTime = saved.time;

            if (saved.isRunning) {
                newTime = saved.time - diff;
            }

            if (newTime <= 0) {
                newTime = 0;
            }

            setMode(saved.mode);
            setTime(newTime);
            setIsRunning(saved.isRunning);
        }
    }, [setMode, setTime, setIsRunning]);

    const formatTime = (t) => {
        const m = Math.floor(t / 60);
        const s = t % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const progress =
        mode === "focus"
            ? (time / focusTime) * 100
            : (time / Math.max(breakTime, 1)) * 100;

    return (
        <div
            className="glass"
            style={{
                padding: "40px",
                textAlign: "center",
                borderRadius: "20px",
            }}
        >
            <h2 style={{ marginBottom: "10px" }}>
                ⏱️ Pomodoro Study Timer
            </h2>

            <p style={{ opacity: 0.7, marginBottom: "20px" }}>
                Focus for 25 minutes, then take a short break. Stay productive 🔥
            </p>

            {/* MODE */}
            <h3
                style={{
                    color: mode === "focus" ? "#6366f1" : "#22c55e",
                    marginBottom: "20px",
                }}
            >
                {mode === "focus" ? "🎯 Focus Time" : "☕ Break Time"}
            </h3>

            <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "#6366f1", marginBottom: "8px" }}>
                    ⚙️ Customize Timer
                </h4>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <input
                        type="number"
                        min="1"
                        placeholder={`Focus (min) — ${Math.round(focusTime / 60)}`}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val > 0) setTime(val * 60);
                        }}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            width: "140px",
                            textAlign: "center",
                        }}
                    />

                    <input
                        type="number"
                        min="1"
                        placeholder={`Break (min) — ${Math.round(breakTime / 60)}`}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val > 0) setBreakTime(val * 60);
                        }}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            width: "140px",
                            textAlign: "center",
                        }}
                    />
                </div>
            </div>

            <div
                style={{
                    width: "200px",
                    height: "200px",
                    margin: "auto",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `conic-gradient(
      ${mode === "focus" ? "#6366f1" : "#22c55e"} ${progress}%,
      rgba(0,0,0,0.1) ${progress}%
    )`,
                    boxShadow: isRunning
                        ? "0 0 40px rgba(99,102,241,0.6)"
                        : "0 0 20px rgba(0,0,0,0.1)",
                    transition: "all 0.4s ease",
                    position: "relative",
                }}
            >
                {/* INNER CLOCK */}
                <div
                    style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        background: "var(--card)",
                        color: "var(--text)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                        fontWeight: "700",
                        letterSpacing: "1px",
                        border: "1px solid var(--border)",
                        boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
                    }}
                >
                    {formatTime(time)}

                    <span
                        style={{
                            fontSize: "12px",
                            marginTop: "6px",
                            opacity: 0.7,
                        }}
                    >
                        {mode === "focus" ? "FOCUS MODE" : "BREAK MODE"}
                    </span>
                </div>

                {/* PULSE ANIMATION */}
                {isRunning && (
                    <div
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            border: "2px solid rgba(99,102,241,0.4)",
                            animation: "pulse 1.5s infinite",
                        }}
                    />
                )}
            </div>

            {/* CONTROLS */}
            <div style={{ marginTop: "25px" }}>
                <button
                    onClick={() => {
                        initAudio();
                        setIsRunning((prev) => !prev);

                        stopAlarm();
                    }}
                    style={{
                        padding: "14px 30px",
                        borderRadius: "30px",
                        border: "none",
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "white",
                        background: isRunning
                            ? "linear-gradient(90deg,#facc15,#f59e0b)"
                            : "linear-gradient(90deg,#6366f1,#8b5cf6)",
                        boxShadow: isRunning
                            ? "0 8px 25px rgba(250,204,21,0.4)"
                            : "0 8px 25px rgba(99,102,241,0.4)",
                        cursor: "pointer",
                        transition: "0.3s",
                    }}
                >
                    {isRunning ? "⏸ Paused" : "▶ Start Studying"}
                </button>

                <br /><br />

                <button
                    onClick={() => {
                        setIsRunning(false);
                        setMode("focus");
                        setTime(focusTime);
                        stopAlarm(); // 🔥 stop alarm here also
                    }}
                    style={{
                        background: "crimson",
                        color: "white",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: "20px",
                        cursor: "pointer",
                    }}
                >
                    🔄 Reset
                </button>
            </div>
        </div>
    );
}