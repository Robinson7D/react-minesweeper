import React from 'react';
import './MinesweeperCell.css';

export default MinesweeperCell;

// Functions:
function MinesweeperCell ({isBomb, isVisible, adjacentBombs, onClick}){
  return <div className={"MinesweeperCell" + (isVisible ? ' visible' : '')}
               onClick={onClick}>{
    <div className="CellValue">
      {isBomb ? "B" : (adjacentBombs ? adjacentBombs : '')}
    </div>
  }</div>;
}