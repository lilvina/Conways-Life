import React from 'react';
import Game from './components/Game.js';
import Rules from './components/rules/rules.js';
import About from './components/About.js';
import Preset from './components/Preset.js';

function App() {
  return (
    <div className="App">
      <h2>Conway's Life</h2>
      <Game />
      <Rules />
      <About />
      <Preset />
    </div>
  );
}

export default App;
