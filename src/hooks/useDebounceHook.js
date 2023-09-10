import { useEffect, useState } from "react";

export const useDebounceHook = (value, delay) => {
  const [valueDebounce, setValueDebounce] = useState("");

  useEffect(() => {
    const handleTime = setTimeout(() => {
      setValueDebounce(value);
    }, [delay]);

    return () => {
      clearTimeout(handleTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return valueDebounce;
};
