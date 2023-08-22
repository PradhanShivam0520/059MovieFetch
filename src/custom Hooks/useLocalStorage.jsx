import { useState, useEffect } from "react";

export function useLocalStoage(initialState, key) {
  // local storage 1 mount whenever restart
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  //storing in local storage 2type
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify([...value]));
  }, [value, key]);

  return [value, setValue];
}
