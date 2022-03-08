import { useEffect } from "react";
import { request } from "utils/request";
import { useAsync } from "./useAsync";

export const useUserList = () => {
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(
      request<ListResult<User>>("/v1/user/users", {
        method: "GET",
        params: { page: 1, pageSize: 10 },
      }).then(({ data }) => {
        return data!.records;
      })
    );
  }, []);

  return result;
};
