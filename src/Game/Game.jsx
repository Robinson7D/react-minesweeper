import React, { Component } from 'react';
import MinesweeperCell from '../MinesweeperCell/MinesweeperCell.jsx';
import openBoardCell from './open-board-cell-util.jsx';
import getGameCondition from './get-game-condition-util.jsx';

import './Game.css';
const CONDITION_MESSAGES_MAP = getConditionMessagesMap();

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      cellRows: buildBoardCells(this.props.size),
      gameCondition: "new",
    };
  }

  onCellClick(cell){
    let cellRows = openBoardCell(cell, this.state.cellRows)

    this.setState({
      cellRows: cellRows,
      gameCondition: getGameCondition(cellRows),
    });
  }

  getGameClassName(){
    return "Game " + this.state.gameCondition;
  }

  getConditionMessage(){
    return CONDITION_MESSAGES_MAP.get(this.state.gameCondition);
  }

  render() {
    return (
      <div className={this.getGameClassName()}>
        <div className="GameBoard">
          {this.state.cellRows.map(row =>
            <div className="BoardRow" key={row.id}>
              {row.cells.map(cell =>
                <MinesweeperCell key={cell.id}
                                 onClick={() => this.onCellClick(cell)}
                                 {...cell}>
                </MinesweeperCell>
              )}
            </div>
          )}
        </div>

        <h3 className="ConditionMessage">
          {this.getConditionMessage()}
        </h3>
      </div>
    );
  }
}

export default Game;

function getConditionMessagesMap(){
  return new Map([
    ['new', 'Click a cell to begin!'],
    ['active', 'Game in progress'],
    ['lose', 'YOU LOSE!'],
    ['win', 'YOU WIN!!!'],
  ]);
}

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