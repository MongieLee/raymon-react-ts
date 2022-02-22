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

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitalState,
    ...initialState,
  });

  const setDate = (data: D) =>
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

  const run = (promise: Promise<D>) => {
    if (!promise) {
      throw new Error("请检查传入的参数是否为Promise");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setDate(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return Promise.reject(error);
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setDate,
    setError,
    ...state,
  };
};
