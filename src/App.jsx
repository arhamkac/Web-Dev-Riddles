import React, { useState } from "react";
import StageOne from "./components/StageOne";
import Result from "./components/Result";
import './App.css'

export default function App() {
  const [stage, setStage] = useState("stage1");
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-8 flex items-center justify-between text-white">
          <h1 className="text-3xl font-extrabold">Web Wing Orientation — Puzzle Quest</h1>
          <div className="text-sm text-white/60">Good luck! 🍀</div>
        </header>

        <main>
          {stage === "stage1" && (
            <StageOne
              onWin={() => { setResult("win"); setStage("result"); }}
              onLose={() => { setResult("lose"); setStage("result"); }}
              timeLimit={60}
            />
          )}
          {stage === "result" && <Result status={result} onRetry={() => { setStage("stage1"); setResult(null); }} />}
        </main>

        <footer className="mt-8 text-center text-white/60 text-xs">
          Designed for a warm welcome — edit riddles & style as you like.
        </footer>
      </div>
    </div>
  );
}
