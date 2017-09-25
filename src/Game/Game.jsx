// Utils:
import React, { Component } from 'react';
import openBoardCell from './open-board-cell-util.jsx';
import getGameCondition from './get-game-condition-util.jsx';
import { buildCellRows } from './cell-rows-util.jsx';
import getDefaultControlValues from '../GameControls/get-default-control-values.jsx';

// Components:
import GameBoard from '../GameBoard/GameBoard.jsx';
import ConditionMessage from '../ConditionMessage/ConditionMessage.jsx';
import GameControls from '../GameControls/GameControls.jsx';

// Styles:
import './Game.css';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = this._getNewGameState(getDefaultControlValues());
  }

  onCellClick(cell){
    // Don't allow losing on first click
    if(this.state.gameCondition === "new") { cell.isBomb = false; }
    else if(this.state.gameCondition !== "active"){
      return this.handleAfterGameClick();
    }
    let cellRows = openBoardCell(cell, this.state.cellRows);

    this.setState({
      cellRows: cellRows,
      gameCondition: getGameCondition(cellRows),
    });
  }

  tryRestart(options) {
    let shouldRestart = (this.state.gameCondition === "new")
                     || confirm("There's a game in progress - are you sure you'd like to start a new game?");

    if(shouldRestart){ this.setState(this._getNewGameState(options)); }
  }

  handleAfterGameClick(){
    if(confirm("The game is over. Would you like to start another?")){
      this.setState(this._getNewGameState(this.state.options));
    }
  }

  _getNewGameState(options){
    return {
      options: options,
      cellRows: buildBoardCells(options),
      gameCondition: "new",
    };
  }

  getGameClassName(){
    return "Game " + this.state.gameCondition;
  }

  render() {
    return (
      <div className={this.getGameClassName()}>
        <GameControls onSubmit={(options)=> this.tryRestart(options)}>
        </GameControls>
        <section className="CurrentGame">
          <ConditionMessage gameCondition={this.state.gameCondition} />
          <GameBoard onCellClick={(cell)=> this.onCellClick(cell)}
                     cellRows={this.state.cellRows}/>
        </section>
      </div>
    );
  }
}

export default Game;

function buildBoardCells({size=10, difficulty=0}){
  let isBomb = (difficulty === -1) ? (()=> true)
                                   : (()=> Math.random() < ((difficulty * 0.05) + 0.075));

  return buildCellRows(size, {isBomb});
}