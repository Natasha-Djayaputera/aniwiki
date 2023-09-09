import { useCallback, useState } from "react";

type UseFlipFlopResult = [
  boolean,
  () => void,
  () => void,
  (next?: boolean) => void
];

export function useFlipFlop(initialValue: boolean = false): UseFlipFlopResult {
  const [state, setState] = useState(initialValue);

  const on = useCallback(() => setState(true), []);
  const off = useCallback(() => setState(false), []);
  const toggle = useCallback(
    (next?: boolean) => setState((prev) => next ?? !prev),
    []
  );

  return [state, on, off, toggle];
}
