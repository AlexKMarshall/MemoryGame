import { useEffect, useReducer, useState } from "react";
import { getRandomNumbers, shuffleArray } from "./utils";
import * as styles from "./App.css";
import { useInterval } from "./useInterval";

type GameState = {
  state: "idle" | "inProgress" | "complete";
  cards: CardState[];
  moves: number;
  /**
   * The time in milliseconds since the game started
   */
  timer: number;
};

type CardState = {
  value: number;
  state: "faceDown" | "faceUp" | "matched";
};

type FlipUpAction = {
  type: "flipUp";
  cardIndex: number;
};
type CheckMatchAction = {
  type: "checkMatch";
};
type FlipNonMatchesDownAction = {
  type: "flipNonMatchesDown";
};
type IncrementTimeAction = {
  type: "incrementTime";
};

type GameActions =
  | FlipUpAction
  | CheckMatchAction
  | FlipNonMatchesDownAction
  | IncrementTimeAction;

function gameReducer(state: GameState, action: GameActions): GameState {
  switch (action.type) {
    case "flipUp": {
      // don't flip up if the the number of allowed face up cards is reached
      if (getFaceUpCardCount(state.cards) === numberInMatch) {
        return state;
      }
      const card = state.cards[action.cardIndex];
      if (card.state === "faceUp") return state;
      if (card.state === "matched") return state;
      // flip card
      const newState = {
        ...state,
        state: "inProgress",
        cards: [...state.cards],
      } satisfies GameState;
      newState.cards[action.cardIndex] = {
        ...card,
        state: "faceUp",
      };
      if (getFaceUpCardCount(newState.cards) === numberInMatch) {
        newState.moves++;
      }
      return newState;
    }
    case "checkMatch": {
      if (getFaceUpCardCount(state.cards) !== numberInMatch) {
        return state;
      }
      const faceUpCards = state.cards.filter((card) => card.state === "faceUp");
      const values = faceUpCards.map((card) => card.value);
      const isMatch = values.every((value) => value === values[0]);
      if (!isMatch) return state;
      const newState = { ...state };

      newState.cards = newState.cards.map((card) => ({
        ...card,
        state: card.state === "faceUp" ? "matched" : card.state,
      }));

      if (getIsGameComplete(newState.cards)) {
        newState.state = "complete";
      }

      return newState;
    }
    case "flipNonMatchesDown": {
      if (getFaceUpCardCount(state.cards) !== numberInMatch) {
        return state;
      }
      const faceUpCards = state.cards.filter((card) => card.state === "faceUp");
      const values = faceUpCards.map((card) => card.value);
      const isMatch = values.every((value) => value === values[0]);
      if (!isMatch) {
        return {
          ...state,
          cards: state.cards.map((card) => {
            if (card.state === "faceUp") {
              return {
                ...card,
                state: "faceDown",
              };
            }
            return card;
          }),
        };
      }
    }

    case "incrementTime": {
      if (state.state !== "inProgress") return state;
      return { ...state, timer: state.timer + 1000 };
    }
    default:
      return state;
  }
}

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

function getInitialGameState(size: 4 | 6 = 4) {
  const numbers = getGameNumbers(size);
  return {
    cards: numbers.map((number) => ({
      value: number,
      state: "faceDown",
    })),
    moves: 0,
    state: "idle",
    timer: 0,
  } satisfies GameState;
}

/**
 * Number of each matching card on the board
 */
const numberInMatch = 2;

function getFaceUpCardCount(cards: CardState[]) {
  return cards.filter((card) => card.state === "faceUp").length;
}

function getIsGameComplete(cards: CardState[]) {
  return cards.every((card) => card.state === "matched");
}

function useGame() {
  const [gameState, dispatch] = useReducer(gameReducer, getInitialGameState());
  const faceUpCardCount = getFaceUpCardCount(gameState.cards);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: "checkMatch" });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [faceUpCardCount]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: "flipNonMatchesDown" });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [faceUpCardCount]);
  useInterval(
    () => dispatch({ type: "incrementTime" }),
    gameState.state === "inProgress" ? 1000 : null
  );

  return [gameState, dispatch] as const;
}

function App() {
  const [gameState, dispatch] = useGame();

  const handleCardSelect = (index: number) => {
    dispatch({ type: "checkMatch" });
    dispatch({ type: "flipNonMatchesDown" });
    dispatch({ type: "flipUp", cardIndex: index });
  };

  const durationDate = new Date(gameState.timer);
  const duractionSeconds = String(durationDate.getUTCSeconds()).padStart(
    2,
    "0"
  );
  const durationMinutes = durationDate.getUTCMinutes();

  const formattedDuration = `${durationMinutes}:${duractionSeconds}`;

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>memory</h1>
      {getIsGameComplete(gameState.cards) ? (
        <div>Game complete</div>
      ) : (
        <ul className={styles.cardGrid}>
          {gameState.cards.map((card, index) => (
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
      )}
      <div className={styles.metadataSection}>
        <div className={styles.greyBox}>
          <h2 className={styles.metadataHeading}>Time</h2>{" "}
          <p className={styles.metadataValue}> {formattedDuration}</p>
        </div>
        <div className={styles.greyBox}>
          <h2 className={styles.metadataHeading}>Moves</h2>{" "}
          <p className={styles.metadataValue}>{gameState.moves}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
