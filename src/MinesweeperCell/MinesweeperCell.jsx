import React from 'react';
import './MinesweeperCell.css';

export default MinesweeperCell;

// Functions:
function MinesweeperCell ({isBomb, visible, adjacentBombs, onClick}){
  let className = "MinesweeperCell";
  if(visible){ className += ' visible'; }
  if(isBomb){ className += ' bomb'; }

  return <div className={className}onClick={onClick}>{
    <div className="CellValue">
      {isBomb ? "💣" : (adjacentBombs ? adjacentBombs : '')}
    </div>
  }</div>;
}