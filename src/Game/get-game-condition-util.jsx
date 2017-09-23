export default getGameCondition;

// TODO: naming is pretty iffy
function getGameCondition(cellRows){
  let nonBombsRemaining = 0,
      i,
      j,
      currentRow,
      currentCell,
      boardSize = cellRows.length; // TODO: allow non-square

  for(i = 0; i < boardSize; i++){
    currentRow = cellRows[i];

    for(j = 0; j < boardSize; j++) {
      currentCell = currentRow.cells[j];

      if(currentCell.visible && currentCell.isBomb){
        return "lose";
      }
      else if(!currentCell.visible && !currentCell.isBomb) {
        nonBombsRemaining++;
      }
    }
  }

  return (nonBombsRemaining === 0) ? "win" : "active";
}