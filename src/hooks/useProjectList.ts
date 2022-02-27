import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { useAsync } from "./useAsync";
import { request } from "utils/request";

export const useProjectList = (params?: { name?: string; uid?: number }) => {
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(
      request("/v1/projects", {
        method: "GET",
        params: { page: 1, pageSize: 10, ...params },
      }).then((data: any) => {
        return data.data.records;
      })
    );
  }, [params]);

  return result;
};
