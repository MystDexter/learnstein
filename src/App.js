import React from "react";
import logo from "./image.png";
import "./App.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import { THEME } from "./components/theme";
import Reader from "./components/reader";
import ImageMap from "./components/imagemap";

function App() {
  return (
    <MuiThemeProvider theme={THEME}>
      <div className='App'>
        <div className='App-header'>
          <img
            style={{ borderRadius: 46 }}
            src={logo}
            className='App-logo'
            alt='logo'
          />
          <h2>LearnStein</h2>
        </div>
        <Reader />
        <ImageMap />
      </div>
    </MuiThemeProvider>
  );
}
export default App;
