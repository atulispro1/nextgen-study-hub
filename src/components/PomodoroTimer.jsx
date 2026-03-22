import { useState, useEffect } from "react";
import { usePomodoro } from "../context/PomodoroContext";
import { useRef } from "react";


export default function PomodoroTimer() {
    const {
        mode,
        time,
        isRunning,
        setIsRunning,
        setTime,
        setMode,
    } = usePomodoro();

    const audioRef = useRef(null);

    const focusTime = 25 * 60;
    const [breakTime, setBreakTime] = useState(5 * 60);



    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]); // ❗ ONLY isRunning

    useEffect(() => {
        if (time > 0) return;

        startAlarm();

        if (mode === "focus") {
            setMode("break");
            setTime(breakTime);
        } else {
            setMode("focus");
            setTime(focusTime);
        }
    }, [time]);

    const [alarm, setAlarm] = useState(null);
    useEffect(() => {
        localStorage.setItem(
            "pomodoro",
            JSON.stringify({
                mode,
                time,
                isRunning,
                lastUpdated: Date.now(),
            })
        );
    }, [mode, time, isRunning]);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("pomodoro"));

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
    }, []);

    // INIT AUDIO (user interaction)
    const initAudio = () => {
        if (!audioRef.current) {
            const audio = new Audio("/sounds/alarm.mp3"); // 🔥 LOCAL FILE
            audio.loop = true;
            audio.volume = 0.4;

            audioRef.current = audio;
        }
    };

    // PLAY
    const startAlarm = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
                console.log("Audio error:", err);
            });
        }
    };

    // STOP
    const stopAlarm = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const formatTime = (t) => {
        const m = Math.floor(t / 60);
        const s = t % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const progress =
        mode === "focus"
            ? (time / focusTime) * 100
            : (time / breakTime) * 100;

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

                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <input
                        type="number"
                        placeholder="Focus (min)"
                        onChange={(e) => setTime(Number(e.target.value) * 60)}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            width: "120px",
                            textAlign: "center",
                        }}
                    />

                    <input
                        type="number"
                        placeholder="Break (min)"
                        onChange={(e) => setBreakTime(Number(e.target.value) * 60)}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            width: "120px",
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
      rgba(255,255,255,0.08) ${progress}%
    )`,
                    boxShadow: isRunning
                        ? "0 0 40px rgba(99,102,241,0.6)"
                        : "0 0 20px rgba(255,255,255,0.1)",
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
                        background: "#0f172a",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                        fontWeight: "700",
                        letterSpacing: "1px",
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

                        // 🔥 Unlock audio (browser requirement)
                        const audio = new Audio();
                        audio.play().catch(() => { });

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
                        setTime(25 * 60);
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