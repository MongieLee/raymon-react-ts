import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitalState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

// 传入初始化state后，自带加载状态和错误管理
export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitalState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      error: null,
      stat: "success",
    });

  const setError = (error: Error) =>
    setState({
      data: null,
      error,
      stat: "error",
    });

  // 传入异步Promise
  const run = (promise: Promise<D>) => {
    if (!promise) {
      throw new Error("请检查传入的参数是否为Promise");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error: Error) => {
        setError(error);
        return Promise.reject(error);
        // 这里需要返回一个reject，外部才能捕获的到，否则Error在这里就被消化了
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
