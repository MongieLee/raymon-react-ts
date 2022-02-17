import {useEffect, useState} from "react";

// const debounce = (callback: (...args: unknown[]) => void, delay: number) => {
//   let timeId: NodeJS.Timeout;
//   return (...params: any[]) => {
//     if (timeId) {
//       clearTimeout(timeId);
//     }
//     timeId = setTimeout(() => {
//       callback(...params);
//     }, delay);
//   };
// };

const useDebounce = <V>(value: V, delay?: number) => {
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

export {useDebounce };