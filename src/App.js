import React from "react";
import Nutrition from "./Components/Nutrition/Nutrition";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="container">
        <h1>Nutrition Counter</h1>
        <Nutrition />
      </div>
    </div>
  );
}

export default App;
