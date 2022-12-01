import React from "react";
import logo from "./image.png";
import "./App.css";

import Reader from "./components/reader";
import ImageMap from "./components/imagemap";

function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <img 
        style ={{borderRadius: 46}}
        src={logo} className='App-logo' alt='logo' />
        <h2>LearnStein</h2>
      </div>
      <Reader />
      <ImageMap />
    </div>
  );
}
export default App;
