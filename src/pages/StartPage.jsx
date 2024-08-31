import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css"; 
function StartPage() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [victoryCondition, setVictoryCondition] = useState("3");
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/game", { state: { player1, player2, victoryCondition } });
  };

  return (
    <div className="start">
      <h1>Start Page - Tic Tac Toe</h1>
      <input
        type="text"
        placeholder="Nome do Player 1"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome do Player 2"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <select
        value={victoryCondition}
        onChange={(e) => setVictoryCondition(e.target.value)}
      >
        <option value="3">3 Vitórias</option>
        <option value="5">5 Vitórias</option>
      </select>
      <button onClick={startGame}>Iniciar Jogo</button>
    </div>
  );
}

export default StartPage;
