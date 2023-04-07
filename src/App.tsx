import { useEffect, useReducer, useState } from "react";
import { getRandomNumbers, shuffleArray } from "./utils";
import * as styles from "./App.css";

type GameState = {
  cards: CardState[];
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

type GameActions = FlipUpAction | CheckMatchAction | FlipNonMatchesDownAction;

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
        cards: [...state.cards],
      };
      newState.cards[action.cardIndex] = {
        ...card,
        state: "faceUp",
      };
      return newState;
    }
    case "checkMatch": {
      if (getFaceUpCardCount(state.cards) !== numberInMatch) {
        return state;
      }
      const faceUpCards = state.cards.filter((card) => card.state === "faceUp");
      const values = faceUpCards.map((card) => card.value);
      const isMatch = values.every((value) => value === values[0]);
      if (isMatch) {
        return {
          ...state,
          cards: state.cards.map((card) => {
            if (card.state === "faceUp") {
              return {
                ...card,
                state: "matched",
              };
            }
            return card;
          }),
        };
      }
      return state;
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
  } satisfies GameState;
}

/**
 * Number of each matching card on the board
 */
const numberInMatch = 2;

function getFaceUpCardCount(cards: CardState[]) {
  return cards.filter((card) => card.state === "faceUp").length;
}

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, getInitialGameState());
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "checkMatch" });
    }, 1000);
    return () => clearTimeout(timer);
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "flipNonMatchesDown" });
    }, 1000);
    return () => clearTimeout(timer);
  });

  const handleCardSelect = (index: number) => {
    dispatch({ type: "checkMatch" });
    dispatch({ type: "flipNonMatchesDown" });
    dispatch({ type: "flipUp", cardIndex: index });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>memory</h1>
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
      <p>Time</p>
    </main>
  );
}

export default App;
