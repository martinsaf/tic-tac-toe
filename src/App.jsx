import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/start" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/" element={<StartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
