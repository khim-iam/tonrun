import { useEffect, useState } from "react";

export function useAsyncInitialize<T>(
  func: () => Promise<T>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _deps: unknown[] = []
) {
  const [state, setState] = useState<T | undefined>();
  useEffect(() => {
    (async () => {
      setState(await func());
    })();
  }, [func]);

  return state;
}   