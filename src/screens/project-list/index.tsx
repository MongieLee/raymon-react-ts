import React, {useEffect, useState} from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {cleanObject} from "utils";
import {useMount} from "hooks/useMount";
import {useDebounce} from "hooks/useDebonuce";
import {useHttp} from "../../utils/http";

export interface ParamType {
  name: string,
  personId: string
}

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: ""
  });
  const debounceValue = useDebounce(param, 300);

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", {data: cleanObject(debounceValue)}).then(setList);
  }, [debounceValue]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users}/>
      <List list={list} users={users}/>
    </>
  );
};