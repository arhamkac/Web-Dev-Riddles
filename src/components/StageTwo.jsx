import React, { useState, useMemo, useRef } from "react";
import Timer from "./Timer";

export default function StageTwo({ onWin, onTimeout }) {
  const [task, setTask] = useState(1);
  const [message, setMessage] = useState("");
  const timerRef = useRef();

  // 50 elements in grid, pick one correct
  const elements = useMemo(() => {
    const count = 50;
    const correctIndex = Math.floor(Math.random() * count);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      isCorrect: i === correctIndex,
    }));
  }, []);

  function handleHover(el) {
    if (el.isCorrect) {
      setMessage("✨ You feel something special near this one...");
    }
  }

  function handleClick(el) {
    if (el.isCorrect) {
      setTask(2);
      setMessage("");
      timerRef.current?.reset(); // reset timer for the next step
    } else {
      setMessage("Nope, try another 😅");
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white flex flex-col items-center p-4">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">
        Stage 2 — The Hidden Secret 🕵️
      </h2>

      {/* Timer always visible */}
      <div className="mb-6">
        <Timer
          ref={timerRef}
          seconds={30}
          running={true}
          onTimeout={onTimeout}
        />
      </div>

      {task === 1 && (
        <>
          <p className="text-sm sm:text-base text-white/80 mb-4 text-center">
            One of these 50 spots hides the secret. Tap / click wisely!
          </p>

          {/* Responsive scattered grid */}
          <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3 sm:gap-4 md:gap-5">
            {elements.map((el) => (
              <button
                key={el.id}
                onMouseEnter={() => handleHover(el)}
                onClick={() => handleClick(el)}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full 
                           bg-white/20 hover:bg-white/40 
                           transition text-sm sm:text-base flex items-center justify-center"
              >
                ?
              </button>
            ))}
          </div>

          {message && (
            <p className="mt-4 text-sm sm:text-base text-center">{message}</p>
          )}
        </>
      )}

      {task === 2 && (
        <div className="flex flex-col items-center justify-center mt-10 text-center px-4">
          <p className="mb-4 text-lg sm:text-xl">🎉 You found the secret spot!</p>
          <p className="mb-2 font-semibold">But the journey isn’t over...</p>
          <p className="italic text-sm sm:text-base">
            Your <b>final homework challenge</b> is hidden somewhere in this page.
            Only the most curious explorers will find it. 🔎
          </p>

          {/* 🔒 Hidden clue (only visible via Inspect / View Source) */}
          <p className="hidden">
            🤫 Hidden clue: Curiosity is the key to Web Wing!
          </p>

          <button
            onClick={onWin}
            className="mt-6 px-4 py-2 rounded-md bg-emerald-400 text-black font-semibold shadow-sm text-sm sm:text-base"
          >
            Finish Stage 2
          </button>
        </div>
      )}
    </div>
  );
}
