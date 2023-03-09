import { combo_winner } from "../constants";

export const checkWinner = (boardToCheck) => {
    for (const combo of combo_winner) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
        return boardToCheck[a];
    }
    return null;
  };