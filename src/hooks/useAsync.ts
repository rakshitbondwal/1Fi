import { useCallback, useEffect, useState } from "react";
import { LoadState } from "@/types/marketplace";

interface UseAsyncResult<T> {
  data: T | null;
  state: LoadState;
  errorMessage: string | null;
  retry: () => void;
}

/**
 * Runs an async fetcher on mount (and whenever `deps` change) and exposes
 * a consistent loading/success/error shape. Centralizing this means every
 * screen renders loading/error states the same way instead of each screen
 * reinventing its own flags.
 */
export function useAsync<T>(fetcher: () => Promise<T>, deps: ReadonlyArray<unknown> = []): UseAsyncResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<LoadState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const run = useCallback(() => {
    let cancelled = false;
    setState("loading");
    setErrorMessage(null);

    fetcher()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setState("success");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
        setState("error");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, ...deps]);

  useEffect(() => run(), [run]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return { data, state, errorMessage, retry };
}
