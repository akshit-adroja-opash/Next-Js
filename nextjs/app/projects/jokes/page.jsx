"use client";

import { useState, useEffect } from "react";
import "../jokes/jokes.css";

const RandomJokes = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPunchline, setShowPunchline] = useState(false);

  const URL = "https://official-joke-api.appspot.com/random_joke";

const fetchRandomJokes = async () => {
    try {
      setShowPunchline(false);
      setLoading(true);
      setError(null);
      const res = await fetch(URL);
      if (!res.ok) throw new Error("Failed to fetch joke");
      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowPunchline(false);
    }
  };

  useEffect(() => {
    fetchRandomJokes();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading a funny joke...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="joke-container">
      <h1 className="joke-title">Random Joke</h1>
      <div className="joke-card">
        <p className="setup-text">{joke?.setup}</p>
        {showPunchline && (
          <p className="punchline-text show">
            {joke?.punchline}
          </p>
        )}
      </div>
      <div className="buttons-container">
        <button
          onClick={() => setShowPunchline(true)}
          disabled={showPunchline}
          className="reveal-btn"
        >
          Reveal
        </button>
        <button
          onClick={fetchRandomJokes}
          className="next-btn"
        >
          Next Joke
        </button>
      </div>
    </div>
  );
};

export default RandomJokes;

