import React from "react";

export default function Result({ status, onRetry }) {
  const win = status === "win";

  return (
    <div className="max-w-2xl w-full bg-gradient-to-br p-8 rounded-2xl shadow-2xl text-center text-white from-emerald-500 to-sky-500">
      <div className="text-6xl">{win ? "🚀" : "😅"}</div>
      <h2 className="text-3xl font-bold mt-4">
        {win ? "Welcome to Web Wing 🚀" : "Better luck next time 😅"}
      </h2>
      <p className="mt-3 text-white/80">
        {win ? "You solved the riddles!" : "Don’t worry — try again!"}
      </p>
      <div className="mt-6">
        <button onClick={onRetry} className="px-4 py-2 rounded-md bg-white/10 border border-white/20">
          Play again
        </button>
      </div>
    </div>
  );
}
