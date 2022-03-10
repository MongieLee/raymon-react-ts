import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { useAsync } from "./useAsync";
import { request } from "utils/request";
import { AxiosResponse } from "axios";

export const useProjectList = (params?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(
      request<ListResult<Project>>("/v1/projects", {
        method: "GET",
        params: { page: 1, pageSize: 10, ...params },
      }).then(({ data }) => {
        return data!.records;
      })
    );
  }, [params]);

  return result;
};
