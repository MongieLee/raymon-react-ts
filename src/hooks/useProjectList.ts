import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";
import { request } from "utils/request";

export const useProjectList = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(request("/v1/user/users", { method: "GET" }).then(
      (data: any) => {
        return data;
      }
    ));
    // run(request("projects", { data: cleanObject(params || {}) }));
  }, [params]);

  return result;
};
