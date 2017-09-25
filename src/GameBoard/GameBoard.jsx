import React, { Component } from 'react';
import MinesweeperCell from '../MinesweeperCell/MinesweeperCell.jsx';

import './GameBoard.css';

class GameBoard extends Component {
  render() {
    return (
      <div className="GameBoard">
        {this.props.cellRows.map(row =>
          <div className="BoardRow" key={row.id}>
            {row.cells.map(cell =>
              <MinesweeperCell key={cell.id}
                               onClick={() => this.props.onCellClick(cell)}
                               {...cell}/>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default GameBoard;