// Utils:
import React, { Component } from 'react';
import openBoardCell from './open-board-cell-util.jsx';
import getGameCondition from './get-game-condition-util.jsx';

// Components:
import GameBoard from '../GameBoard/GameBoard.jsx';
import ConditionMessage from '../ConditionMessage/ConditionMessage.jsx';
import GameControls from '../GameControls/GameControls.jsx';

// Styles:
import './Game.css';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = this._getNewGameState();
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

  onRestartClick(options) {
    this.setState(this._getNewGameState(options));
  }

  handleAfterGameClick(){
    if(confirm("The game is over. Would you like to start another?")){
      this.onRestartClick(this.state.options);
    }
  }

  _getNewGameState(options={}){
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
        <GameControls onRestartClick={(options)=> this.onRestartClick(options)}>
        </GameControls>
        <section className="CurrentGame">
          <ConditionMessage gameCondition={this.state.gameCondition}>
          </ConditionMessage>
          <GameBoard onCellClick={(cell)=> this.onCellClick(cell)}
                     cellRows={this.state.cellRows}>
          </GameBoard>
        </section>
      </div>
    );
  }
}

export default Game;

function buildBoardCells({size=10, difficulty=0}){
  let i,
      j,
      cells = [], // Nested array for rows, columns
      currentRow,
      bombRandomThreshold = (difficulty * 0.05) + 0.075;

  if(difficulty === -1){ bombRandomThreshold = 1; }

  for(i = 0; i < size; i++) {
    currentRow = {
      id: 'row_'+i,
      cells: [],
    };

    for(j = 0; j < size; j++) {
      currentRow.cells.push({
        id: 'row_'+i+'_cell_'+j,
        visible: false,
        isBomb: Math.random() < bombRandomThreshold, // TODO: place bombs after first click
        adjacentBombs: null, // Will calculate lazily
        row: i,
        column: j,
      });
    }

    cells.push(currentRow);
  }

  return cells;
}