import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Reader from "./components/reader";

function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h2>LearnStein</h2>
      </div>
      <Reader />
    </div>
  );
}
export default App;
