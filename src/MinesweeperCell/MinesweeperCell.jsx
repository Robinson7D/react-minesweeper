import React from 'react';
import './MinesweeperCell.css';

export default MinesweeperCell;

// Functions:
function MinesweeperCell ({isBomb, visible, adjacentBombs, onClick}){
  return <div className={"MinesweeperCell" + (visible ? ' visible' : '')}
               onClick={onClick}>{
    <div className="CellValue">
      {isBomb ? "B" : (adjacentBombs ? adjacentBombs : '')}
    </div>
  }</div>;
}