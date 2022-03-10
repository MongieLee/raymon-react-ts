import { useMemo } from "react";
import { useQueryParams } from "utils/url";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useQueryParams(["name", "userId"]);
  return [
    useMemo(
      () => ({ ...param, userId: Number(param.userId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
