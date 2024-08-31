import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function LeaderboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { winner } = location.state || { winner: "Unknown" };

  const goToStart = () => {
    navigate("/start"); 
  };

  return (
    <div>
      <h1>Leaderboard - Tic Tac Toe</h1>
      <p>Vencedor: {winner}</p>
      <button onClick={goToStart}>Voltar para a StartPage</button>
    </div>
  );
}

export default LeaderboardPage;
