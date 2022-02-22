import { useEffect } from "react";

const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里添加callback会造成无限循环，和useCallback以及useMemo有关系
  }, []);
};

export { useMount };
