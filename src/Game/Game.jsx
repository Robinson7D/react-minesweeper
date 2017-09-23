import React, { Component } from 'react';
import MinesweeperCell from '../MinesweeperCell/MinesweeperCell.jsx';
import './Game.css';


class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      cellRows: buildBoardCells(this.props.size),
    };
  }

  onCellClick(cell){
    alert("CLICKED!" + JSON.stringify(cell));
  }

  render() {
    return (
      <div className="Game">
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