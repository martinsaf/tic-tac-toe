import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GamePage.css";

function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { player1, player2, victoryCondition } = location.state || {
    player1: "",
    player2: "",
    victoryCondition: "3",
  };
  const numericVictoryCondition = parseInt(victoryCondition, 10);

  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ [player1]: 0, [player2]: 0 });

  useEffect(() => {
    const winnerFound = checkForWinner();
    if (winnerFound) {
      updateScore(winnerFound);
      if (score[winnerFound] + 1 >= numericVictoryCondition) {
        navigate("/leaderboard", { state: { winner: winnerFound } });
      } else {
        setBoard(emptyBoard);
      }
    } else if (!board.includes(null)) {
      // Verifica empate
      setBoard(emptyBoard); // Reset sem mudar o score para empate
    } else {
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    }
  }, [board]);

  const checkForWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const player = board[a] === "X" ? player1 : player2;
        setWinner(player);
        return player;
      }
    }
    return null;
  };

  const updateScore = (player) => {
    setScore((prevScore) => ({
      ...prevScore,
      [player]: prevScore[player] + 1,
    }));
    setWinner(null); // Limpa o vencedor para o próximo jogo
  };

  const handleCellClick = (index) => {
    if (board[index] || winner) return;
    const newSymbol = currentPlayer === player1 ? "X" : "O";
    const newBoard = [...board];
    newBoard[index] = newSymbol;
    setBoard(newBoard);
  };

  const renderCell = (index) => {
    return (
      <button
        key={index}
        className="cell"
        onClick={() => handleCellClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="info">
        <div className={currentPlayer === player1 ? "active player" : "player"}>
          {player1}: {score[player1]}
        </div>
        <div className={currentPlayer === player2 ? "active player" : "player"}>
          {player2}: {score[player2]}
        </div>
      </div>
      <div className="board">
        {Array.from({ length: 9 }).map((_, index) => renderCell(index))}
      </div>
      {winner && (
        <div className="winner-message">
          <span>Winner is {winner}</span>
        </div>
      )}
    </div>
  );
}

export default GamePage;
