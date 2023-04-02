import { useState } from "react";
import { getRandomNumbers, shuffleArray } from "./utils";
import * as styles from "./App.css";

// state needed
// array of items on the board
// item has value, turned, matched, which player matched it

function getGameNumbers(size: 4 | 6 = 4) {
  const uniqueNumberCount = (size * size) / 2;
  const uniqueNumbers = getRandomNumbers({
    length: uniqueNumberCount,
    min: 1,
    max: 9,
  });
  const numbers = [...uniqueNumbers, ...uniqueNumbers];
  return shuffleArray(numbers);
}

type GameState = { value: number; state: "faceDown" | "faceUp" | "matched" }[];

function getInitialGameState(size: 4 | 6 = 4) {
  const numbers = getGameNumbers(size);
  return numbers.map((number) => ({
    value: number,
    state: "faceDown",
  })) satisfies GameState;
}

function App() {
  const [gameState, setGameState] = useState<GameState>(() =>
    getInitialGameState(4)
  );

  const handleCardSelect = (index: number) => {
    const card = gameState[index];
    if (card.state === "faceUp") return;
    if (card.state === "matched") return;
    // flip card
    setGameState((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        ...card,
        state: "faceUp",
      };
      return newState;
    });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>memory</h1>
      <ul className={styles.cardGrid}>
        {gameState.map((card, index) => (
          <li key={index}>
            <button
              onClick={() => handleCardSelect(index)}
              className={styles.cardButton[card.state]}
            >
              {card.state === "matched" ? (
                <span>{card.value}!</span>
              ) : card.state === "faceUp" ? (
                card.value
              ) : null}
            </button>
          </li>
        ))}
      </ul>
      <p>Time</p>
    </main>
  );
}

export default App;
