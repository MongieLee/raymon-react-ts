import React, {useEffect, useState} from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: ""
  });

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async response => {
      console.log(response.json());
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      console.log(response.json());
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, [param]);


  useEffect(() => {
  }, [param]);
  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users}/>
      <List list={list} users={users}/>
    </>
  );
};