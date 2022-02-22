import { useEffect } from "react";
import { User } from "screens/project-list/search-panel";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

export const useUserList = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject({}) }));
  }, []);

  return result;
};
