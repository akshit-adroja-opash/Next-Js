"use client";
import { useState } from "react"

export const Counter = () => {
  const [inc, setInc] = useState(0);

  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
      onClick={() => setInc((prev) => prev + 1)}
    >
      Count: {inc}
    </button>
  );
};

