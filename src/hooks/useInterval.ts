import { useEffect, useRef } from "react";

type Callback = () => void;
export function useInterval(callback: Callback, delayMs: number | null) {
  const savedCallback = useRef<Callback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delayMs !== null) {
      let id = setInterval(tick, delayMs);
      return () => clearInterval(id);
    }
  }, [delayMs]);
}
