import { useEffect, useReducer } from "react";
import { getRandomNumbers, shuffleArray } from "../utils";
import * as styles from "./Home.css";
import { useInterval } from "../useInterval";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Stack } from "../components/Stack";
import { Button, ButtonLink } from "../components/Button";

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
type RestartGameAction = {
  type: "restartGame";
};

type GameActions =
  | FlipUpAction
  | CheckMatchAction
  | FlipNonMatchesDownAction
  | IncrementTimeAction
  | RestartGameAction;

function getGameReducer(settings: Settings) {
  return function gameReducer(
    state: GameState,
    action: GameActions
  ): GameState {
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
        const faceUpCards = state.cards.filter(
          (card) => card.state === "faceUp"
        );
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
        const faceUpCards = state.cards.filter(
          (card) => card.state === "faceUp"
        );
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
      case "restartGame": {
        return getInitialGameState(settings);
      }
      default:
        return state;
    }
  };
}

function getGameNumbers(size: 4 | 6 = 4) {
  const uniqueNumberCount = (size * size) / 2;
  const uniqueNumbers = getRandomNumbers({
    length: uniqueNumberCount,
    min: 1,
    max: 99,
  });
  const numbers = [...uniqueNumbers, ...uniqueNumbers];
  return shuffleArray(numbers);
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

const settingsSchema = z.object({
  size: z.preprocess(Number, z.union([z.literal(4), z.literal(6)])),
});

type Settings = z.infer<typeof settingsSchema>;

const defaultSettings = {
  size: 4,
} satisfies Settings;

function getInitialGameState(settings: Settings) {
  const numbers = getGameNumbers(settings.size);
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

function useGame(settings: Settings) {
  const [gameState, dispatch] = useReducer(
    getGameReducer(settings),
    getInitialGameState(settings)
  );

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

export function Home() {
  const [searchParams] = useSearchParams();

  const parsedQuery = settingsSchema.safeParse(
    Object.fromEntries(searchParams.entries())
  );

  const settings = parsedQuery.success ? parsedQuery.data : defaultSettings;

  const [gameState, dispatch] = useGame(settings);

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
      <div className={styles.layout}>
        <div className={styles.header}>
          <h1 className={styles.heading}>memory</h1>
          <div className={styles.hideMobile}>
            <div className={styles.gameControls}>
              <Button
                color="primary"
                onClick={() => dispatch({ type: "restartGame" })}
              >
                Restart
              </Button>
              <ButtonLink to="/settings" color="secondary">
                New Game
              </ButtonLink>
            </div>
          </div>
          <div className={styles.hideTablet}>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button color="primary">Menu</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className={styles.dialogOverlay} />
                <div className={styles.dialogPositioner}>
                  <Dialog.Content className={styles.dialogContent}>
                    <Stack gap={4}>
                      <Dialog.Close
                        asChild
                        onClick={() => dispatch({ type: "restartGame" })}
                      >
                        <Button color="primary">Restart</Button>
                      </Dialog.Close>
                      <ButtonLink to="/settings" color="secondary">
                        New Game
                      </ButtonLink>
                      <Dialog.Close asChild>
                        <Button color="secondary">Resume Game</Button>
                      </Dialog.Close>
                    </Stack>
                  </Dialog.Content>
                </div>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
        <ul className={styles.cardGrid} data-size={settings.size}>
          {gameState.cards.map((card, index) => (
            <li key={index}>
              <button
                onClick={() => handleCardSelect(index)}
                className={styles.cardButton[card.state]}
              >
                {card.state === "faceDown" ? null : card.value}
              </button>
            </li>
          ))}
        </ul>
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
        <Dialog.Root open={gameState.state === "complete"}>
          <Dialog.Portal>
            <Dialog.Overlay className={styles.dialogOverlay} />
            <div className={styles.dialogPositioner}>
              <Dialog.Content className={styles.dialogContent}>
                <Stack gap={{ mobile: 6, tablet: 10 }}>
                  <Stack gap={{ mobile: 2, tablet: 4 }} align="center">
                    <Dialog.Title className={styles.dialogHeading}>
                      You did it!
                    </Dialog.Title>
                    <p className={styles.dialogSubheading}>
                      Game over! Here&apos;s how you got on&hellip;
                    </p>
                  </Stack>
                  <Stack gap={{ mobile: 2, tablet: 4 }} as="dl">
                    <div className={styles.gameScoreItem}>
                      <dt className={styles.gameScoreDt}>Time Elapsed</dt>
                      <dd className={styles.gameScoreDd}>
                        {formattedDuration}
                      </dd>
                    </div>
                    <div className={styles.gameScoreItem}>
                      <dt className={styles.gameScoreDt}>Moves Taken</dt>
                      <dd className={styles.gameScoreDd}>
                        {gameState.moves} Moves
                      </dd>
                    </div>
                  </Stack>
                  <div className={styles.gameCompleteActions}>
                    <Button
                      color="primary"
                      onClick={() => dispatch({ type: "restartGame" })}
                    >
                      Restart
                    </Button>
                    <ButtonLink to="/settings" color="secondary">
                      Setup New Game
                    </ButtonLink>
                  </div>
                </Stack>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </main>
  );
}
