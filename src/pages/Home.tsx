import { ReactNode, useEffect, useReducer } from "react";
import { getRandomNumbers, shuffleArray } from "../utils";
import * as styles from "./Home.css";
import { useInterval } from "../hooks/useInterval";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Stack } from "../components/Stack";
import { Button, ButtonLink } from "../components/Button";
import { LayoutGrid, useRovingTabItem } from "../components/LayoutGrid";
import { Dialog } from "../components/Dialog";

type GameState = {
  state: "idle" | "inProgress" | "complete";
  cards: CardState[];
  moves: number;
  /**
   * The time in milliseconds since the game started
   */
  timer: number;
  scores: number[];
};

type CardState = {
  id: number;
  value: number;
  state: "faceDown" | "faceUp" | "matched";
};

type FlipUpAction = {
  type: "flipUp";
  cardIndex: number;
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
type CompleteGameAction = {
  type: "completeGame";
};

type GameActions =
  | FlipUpAction
  | FlipNonMatchesDownAction
  | IncrementTimeAction
  | CompleteGameAction
  | RestartGameAction;

function getGameReducer(settings: Settings) {
  return function gameReducer(
    state: GameState,
    action: GameActions
  ): GameState {
    switch (action.type) {
      case "flipUp": {
        console.log("flip up");
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

        if (getFaceUpCardCount(newState.cards) < numberInMatch) {
          return newState;
        }

        const faceUpValues = newState.cards
          .filter((card) => card.state === "faceUp")
          .map((card) => card.value);

        const isMatch = faceUpValues.every(
          (value) => value === faceUpValues[0]
        );

        const currentPlayerIndex = state.moves % settings.players;

        if (isMatch) {
          // Update score
          console.log("update score");
          newState.scores = newState.scores.map((score, index) =>
            index === currentPlayerIndex ? score + 1 : score
          );
          // Set card state to matched
          newState.cards = newState.cards.map((card) => {
            if (card.state === "faceUp") {
              return {
                ...card,
                state: "matched",
              };
            }
            return card;
          });
        }

        // Update moves
        newState.moves += 1;

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
        // no need to flip down if there is a match
        if (isMatch) {
          return state;
        }
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

      case "incrementTime": {
        if (state.state !== "inProgress") return state;
        return { ...state, timer: state.timer + 1000 };
      }
      case "restartGame": {
        return getInitialGameState(settings);
      }
      case "completeGame": {
        return {
          ...state,
          state: "complete",
        };
      }
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
  players: z.preprocess(Number, z.number().int().min(1).max(4)),
});

type Settings = z.infer<typeof settingsSchema>;

const defaultSettings = {
  size: 4,
  players: 1,
} satisfies Settings;

function getInitialGameState(settings: Settings) {
  const numbers = getGameNumbers(settings.size);
  const scores = Array.from({ length: settings.players }, () => 0);
  return {
    cards: numbers.map((number, index) => ({
      id: index,
      value: number,
      state: "faceDown",
    })),
    moves: 0,
    state: "idle",
    timer: 0,
    scores,
  } satisfies GameState;
}

function useGame(settings: Settings) {
  const [gameState, dispatch] = useReducer(
    getGameReducer(settings),
    getInitialGameState(settings)
  );

  const faceUpCardCount = getFaceUpCardCount(gameState.cards);

  const matchedCardsCount = gameState.cards.filter(
    (card) => card.state === "matched"
  ).length;
  const totalCardsCount = gameState.cards.length;

  useEffect(() => {
    if (matchedCardsCount === totalCardsCount) {
      dispatch({ type: "completeGame" });
    }
  }, [matchedCardsCount, totalCardsCount]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: "flipNonMatchesDown" });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [faceUpCardCount]);

  const isMultiplayer = settings.players > 1;
  const isSinglePlayer = !isMultiplayer;

  useInterval(
    () => dispatch({ type: "incrementTime" }),
    gameState.state === "inProgress" && isSinglePlayer ? 1000 : null
  );

  const currentPlayerIndex = gameState.moves % settings.players;

  return { gameState, dispatch, isMultiplayer, currentPlayerIndex };
}

export function Home() {
  const [searchParams] = useSearchParams();

  const parsedQuery = settingsSchema.safeParse(
    Object.fromEntries(searchParams.entries())
  );

  const settings = parsedQuery.success ? parsedQuery.data : defaultSettings;

  const { gameState, dispatch, isMultiplayer, currentPlayerIndex } =
    useGame(settings);

  const handleCardSelect = (index: number) => {
    // dispatch({ type: "checkMatch" });
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

  const sortedScoresByPlayer = gameState.scores
    .map((score, index) => ({
      score,
      playerIndex: index,
    }))
    .sort((a, b) => b.score - a.score);

  const isGameComplete = gameState.state === "complete";
  const hasWinner =
    isMultiplayer &&
    isGameComplete &&
    sortedScoresByPlayer[0].score > sortedScoresByPlayer[1]?.score;
  const isDraw = isMultiplayer && isGameComplete && !hasWinner;

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
            <Dialog>
              <Dialog.Trigger asChild>
                <Button color="primary">Menu</Button>
              </Dialog.Trigger>
              <Dialog.Content>
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
            </Dialog>
          </div>
        </div>
        <LayoutGrid
          items={gameState.cards}
          rowLength={settings.size}
          className={styles.cardGrid}
        >
          {(card) => (
            <Card
              id={card.id}
              onClick={() => handleCardSelect(card.id)}
              state={card.state}
            >
              {card.value}
            </Card>
          )}
        </LayoutGrid>
        <div className={styles.metadataSection}>
          {isMultiplayer ? (
            gameState.scores.map((score, index) => (
              <div
                key={index}
                className={styles.playerIndicator}
                aria-current={currentPlayerIndex === index ? "step" : undefined}
              >
                <h2 className={styles.playerNumber}>P{index + 1}</h2>
                <p className={styles.playerScore}>{score}</p>
              </div>
            ))
          ) : (
            <>
              <div className={styles.greyBox}>
                <h2 className={styles.metadataHeading}>Time</h2>
                <p className={styles.metadataValue}> {formattedDuration}</p>
              </div>
              <div className={styles.greyBox}>
                <h2 className={styles.metadataHeading}>Moves</h2>
                <p className={styles.metadataValue}>{gameState.moves}</p>
              </div>
            </>
          )}
        </div>
        <Dialog open={gameState.state === "complete"}>
          <Dialog.Content>
            <Stack gap={{ mobile: 6, tablet: 10 }}>
              <Stack gap={{ mobile: 2, tablet: 4 }} align="center">
                <Dialog.Title>
                  {hasWinner ? (
                    <>Player {sortedScoresByPlayer[0].playerIndex + 1} Wins!</>
                  ) : isDraw ? (
                    <>It&apos; a tie!</>
                  ) : (
                    <>You did it!</>
                  )}
                </Dialog.Title>
                <Dialog.Subtitle>
                  {isMultiplayer ? (
                    <>Game over! Here are the results&hellip;</>
                  ) : (
                    <>Game over! Here&apos;s how you got on&hellip</>
                  )}
                </Dialog.Subtitle>
              </Stack>
              <Stack gap={{ mobile: 2, tablet: 4 }} as="dl">
                {isMultiplayer ? (
                  <>
                    {sortedScoresByPlayer.map((score) => (
                      <div
                        key={score.playerIndex}
                        className={styles.gameScoreItem}
                        data-inverted={
                          score.score === sortedScoresByPlayer[0].score
                            ? "(Winner!)"
                            : undefined
                        }
                      >
                        <dt className={styles.gameScoreDt}>
                          Player {score.playerIndex + 1}{" "}
                          {score.score === sortedScoresByPlayer[0].score
                            ? "(Winner!)"
                            : null}
                        </dt>
                        <dd className={styles.gameScoreDd}>{score.score}</dd>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
        </Dialog>
      </div>
    </main>
  );
}

type CardProps = {
  id: CardState["id"];
  children: ReactNode;
  onClick: () => void;
  state: CardState["state"];
};
function Card({ id, children, onClick, state }: CardProps) {
  const { ref, props } = useRovingTabItem({ id });

  return (
    <button
      {...props}
      ref={ref}
      onClick={onClick}
      className={styles.cardButton[state]}
    >
      {state === "faceDown" ? null : children}
    </button>
  );
}
