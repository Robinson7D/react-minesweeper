import React, { Component } from 'react';
import Game from './Game/Game.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Minesweeper</h2>
        </div>

        <Game size={10}>
        </Game>
      </div>
    );
  }
}

export default App;
