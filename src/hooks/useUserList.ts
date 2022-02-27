import { useEffect } from "react";
import { User } from "screens/project-list/search-panel";
import { request } from "utils/request";
import { useAsync } from "./useAsync";

export const useUserList = () => {
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(
      request("/v1/user/users", {
        method: "GET",
        params: { page: 1, pageSize: 10 },
      }).then((data: any) => {
        return data.data.records;
      })
    );
  }, []);

  return result;
};
