import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { EpicScreen } from "./EpicScreen";
import { KanbanScreen } from "./KanbanScreen";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen Index</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务</Link>
      <Routes>
        <Route path={"kanban"} element={<KanbanScreen />}></Route>
        <Route path={"epic"} element={<EpicScreen />}></Route>
        {/* 强制重定向 */}
        <Route path="*" element={<Navigate to={"kanban"} />}></Route>
      </Routes>
    </div>
  );
};
