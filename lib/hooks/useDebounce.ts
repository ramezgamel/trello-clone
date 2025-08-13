import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const debounce = setInterval(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearInterval(debounce);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
