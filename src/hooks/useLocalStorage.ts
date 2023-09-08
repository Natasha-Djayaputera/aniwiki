import { useEffect, useRef, useState } from "react";

export function useLocalStorage(key: string) {
  const [value, setValue] = useState(localStorage.getItem(key));
  const latestValue = useRef(value);
  latestValue.current = value;

  const updateValue = (nextValue: string) => {
    if (nextValue === value) return;

    localStorage.setItem(key, nextValue);
    setValue(nextValue);
  };

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) setValue(e.newValue);
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key]);

  return [value, updateValue] as const;
}
