import React, {useEffect, useState} from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {cleanObject} from "uitils";
import qs from "qs";
import {useMount} from "hooks/useMount";
import {useDebounce} from "hooks/useDebonuce";

const apiUrl = process.env.REACT_APP_API_URL;

export type paramType = {
  name: string,
  personId: string
}

export const ProjectListScreen = () => {
  const [param, setParam] = useState<paramType>({
    name: "",
    personId: ""
  });
  const debounceValue = useDebounce(param, 300);

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceValue))}`).then(async response => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceValue]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users}/>
      <List list={list} users={users}/>
    </>
  );
};