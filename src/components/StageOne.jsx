import React, { useState, useRef } from "react";
import Timer from "./Timer";

const RIDDLES = [
  { id: 1, q: "I speak without a mouth and hear without ears...", a: "echo", hint: "You hear it in caves" },
  { id: 2, q: "I’m tall when I’m young and short when I’m old...", a: "candle", hint: "On a cake 🎂" },
];

export default function StageOne({ onWin, onLose, timeLimit = 30 }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [running, setRunning] = useState(true);
  const timerRef = useRef();

  const current = RIDDLES[index];
  const normalize = (s) => s.trim().toLowerCase();

  function submit() {
    setAttempts((a) => a + 1);
    if (normalize(answer) === normalize(current.a)) {
      setFeedback({ ok: true, msg: "Correct! 🎉" });
      setTimeout(() => {
        if (index + 1 < RIDDLES.length) {
          setIndex(index + 1);
          setAnswer("");
          setFeedback(null);
          timerRef.current?.reset(timeLimit); // reset timer for next riddle
        } else {
          setRunning(false);
          onWin();
        }
      }, 700);
    } else {
      setFeedback({ ok: false, msg: "Not quite — try again or use the hint!" });
    }
  }

  function useHint() {
    setFeedback({ ok: null, msg: `Hint: ${current.hint}` });
    setAttempts((a) => a + 1);
  }

  return (
    <div className="max-w-3xl w-full bg-gradient-to-br from-sky-600 to-indigo-600 rounded-2xl p-6 shadow-2xl text-white">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Stage 1 — Junior Riddles</h2>
          <p className="mt-2 text-sm text-white/80">Solve riddles in {timeLimit} seconds.</p>
        </div>
        <Timer
          ref={timerRef}
          seconds={timeLimit}
          running={running}
          onTimeout={onLose} // ⏱️ lose when time runs out
        />
      </div>

      <div className="mt-6 bg-white/6 p-5 rounded-lg border border-white/8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-white/80">
              Riddle {index + 1} of {RIDDLES.length}
            </div>
            <h3 className="text-xl font-semibold mt-1">{current.q}</h3>
          </div>
          <div className="text-sm text-white/80">Attempts: {attempts}</div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Type your answer..."
            className="col-span-2 px-3 py-2 rounded-md bg-white/10 border border-white/10 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={submit}
              className="px-3 py-2 rounded-md bg-emerald-400 text-black font-semibold"
            >
              Submit
            </button>
            <button
              onClick={useHint}
              className="px-3 py-2 rounded-md bg-yellow-300 text-black"
            >
              Hint
            </button>
          </div>
        </div>

        {feedback && (
          <div className="mt-4 p-3 rounded-md bg-black/20">{feedback.msg}</div>
        )}
      </div>
    </div>
  );
}
