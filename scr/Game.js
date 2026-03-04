import { useState, useEffect } from 'react';
import Board from './Board';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [scoreX, setScoreX] = useState(0);  // Scorul pentru X
  const [scoreO, setScoreO] = useState(0);  // Scorul pentru O

  // Citirea scorului din localStorage la prima incărcare a paginii
  useEffect(() => {
    const storedScoreX = localStorage.getItem('scoreX');
    const storedScoreO = localStorage.getItem('scoreO');
    
    if (storedScoreX) setScoreX(Number(storedScoreX));
    if (storedScoreO) setScoreO(Number(storedScoreO));
  }, []);

  // Actualizam scorului în localStorage
  useEffect(() => {
    localStorage.setItem('scoreX', scoreX);
    localStorage.setItem('scoreO', scoreO);
  }, [scoreX, scoreO]);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const winner = calculateWinner(currentSquares);

  // Actualizeaza scorul doar când meciul este castigat de cineva sau e egal
  useEffect(() => {
    if (winner === 'X') {
      setScoreX(prevScoreX => prevScoreX + 1);
    } else if (winner === 'O') {
      setScoreO(prevScoreO => prevScoreO + 1);
    } else if (currentSquares.every(Boolean) && !winner) {
      // În caz de egal
      console.log("Egal!");
    }
  }, [winner, currentSquares]);

  const moves = history.map((_, move) => {
    const description = move === 0 ? "Go to game start" : `Go to move #${move}`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      {/* Tabela de scor */}
      <div className="scoreboard">
        <div className="player">
          X
        </div>
        <div className="player o">
          O
        </div>
        <div className="score">
          {scoreX}
        </div>
        <div className="score">
          {scoreO}
        </div>
      </div>

      <div className="moves-box">
        <h3>Mutări:</h3>
        <ol>{moves}</ol>
      </div>

      <div className="game-board">
        <Board
          squares={currentSquares}
          xIsNext={xIsNext}
          onPlay={handlePlay}
        />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
