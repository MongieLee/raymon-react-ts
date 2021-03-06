import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";
/**
 * 返回url中的，指定query键的值
 */
const useQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  //   searchParams.xx; // 不能这样读取值
  return [
    useMemo(
      () =>
        keys.reduce((preV, nextKey) => {
          return { ...preV, [nextKey]: searchParams.get(nextKey) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      setSearchParams(o);
    },
  ] as const;
  //   as const的作用解决字面量问题
};
export { useQueryParams };

// type T1 = {[key: string]: null};
// type T2 = {[key in string]: null};

// const t1: T1 = {'foo': null, 10: null};
// const t2: T2 = {'foo': null, 10: null};

// type S1 = keyof T1; // string | number
// type S2 = keyof T2; // string

// const s1: S1 = 10;
// const s2: S2 = 10; // error
