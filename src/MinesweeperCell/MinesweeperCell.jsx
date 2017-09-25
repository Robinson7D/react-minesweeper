import React from 'react';
import './MinesweeperCell.css';

export default MinesweeperCell;

// Functions:
function MinesweeperCell ({isBomb, visible, adjacentBombs, onClick}){
  let className = "MinesweeperCell",
      _cellValue = null;
  if(visible){
    className += ' visible';
    _cellValue = isBomb ? "💣" : (adjacentBombs ? adjacentBombs : '');
  }
  if(isBomb){ className += ' bomb'; }


  return <div className={className} onClick={onClick}>{
    <div className="CellValue">{_cellValue}</div>
  }</div>;
}