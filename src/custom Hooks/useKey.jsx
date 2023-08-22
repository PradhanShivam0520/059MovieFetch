import { useEffect } from "react";

export function useKeydownKey(key, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
}
