import {useEffect, useState} from "react";

const debounce = (callback: (...args: any[]) => any, delay: number) => {
  let timeId: NodeJS.Timeout;
  return (...params: any[]) => {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      callback(...params);
    }, delay);
  };
};

const useDebounce = (value: any, delay?: number) => {
  const [debounceValue, setDeBounceValue] = useState(value);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDeBounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timeId);
    };
  }, [value, delay]);

  return debounceValue;
};

export {useDebounce, debounce};