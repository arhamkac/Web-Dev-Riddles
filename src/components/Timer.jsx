import React, { useState, useEffect, useRef } from "react";

const Timer = React.forwardRef(({ seconds = 60, onTimeout, running = true }, ref) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef(null);

  React.useImperativeHandle(ref, () => ({
    reset: (newSec = seconds) => setTimeLeft(newSec),
  }));

  useEffect(() => {
    if (!running) return;
    setTimeLeft(seconds);
    intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, [seconds, running]);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
      onTimeout && onTimeout();
    }
  }, [timeLeft, onTimeout]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(Math.max(0, timeLeft % 60)).padStart(2, "0");

  return (
    <div className="flex items-center gap-3">
      <div className="bg-white/10 px-3 py-2 rounded-lg shadow-sm border border-white/10">
        <span className="font-mono text-lg">{mm}:{ss}</span>
      </div>
      <div className="text-sm text-white/70">time left</div>
    </div>
  );
});

export default Timer;
