import React from "react";
import "./App.css";
import {ProjectListScreen} from "./screens/project-list";

console.log(process.env.NOVE_ENV);

function App() {
  return (
    <div className="App">
      <ProjectListScreen/>
    </div>
  );
}

export default App;
