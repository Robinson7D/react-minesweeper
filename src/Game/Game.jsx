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
    this.state = this._getNewGameState(10);
  }

  onCellClick(cell){
    let cellRows = openBoardCell(cell, this.state.cellRows)

    this.setState({
      cellRows: cellRows,
      gameCondition: getGameCondition(cellRows),
    });
  }

  onRestartClick(size) {
    this.setState(this._getNewGameState(size));
  }

  _getNewGameState(size=10){
    return {
      size: size,
      cellRows: buildBoardCells(size),
      gameCondition: "new",
    };
  }

  getGameClassName(){
    return "Game " + this.state.gameCondition;
  }

  render() {
    return (
      <div className={this.getGameClassName()}>
        <GameControls onRestartClick={(size)=> this.onRestartClick(size)}>
        </GameControls>
        <section class="CurrentGame">
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

function buildBoardCells(size=10){
  let i,
      j,
      cells = [], // Nested array for rows, columns
      currentRow;

  for(i = 0; i < size; i++) {
    currentRow = {
      id: 'row_'+i,
      cells: [],
    };

    for(j = 0; j < size; j++) {
      currentRow.cells.push({
        id: 'row_'+i+'_cell_'+j,
        visible: false,
        isBomb: Math.random() < 0.1, // TODO: place bombs after first click
        adjacentBombs: null, // Will calculate lazily
        row: i,
        column: j,
      });
    }

    cells.push(currentRow);
  }

  return cells;
}