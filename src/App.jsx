import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square";
import { turns } from "./constants";
import { checkWinner } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(turns.X);
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    //no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return;

    //actualizar tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //cambiar el turno
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);

    //revisar si hay aganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);

      //si hay empate
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //empate
    }
  };

  return (
    <main className="board">
      <h1>Game: tic-tac-toe </h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turns">
        <Square isSelected={turn === turns.X}>{turns.X}</Square>
        <Square isSelected={turn === turns.O}>{turns.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
