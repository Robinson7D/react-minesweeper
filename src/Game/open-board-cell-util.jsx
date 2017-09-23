export default openBoardCell;

function openBoardCell(cell, gameBoard){
  let stack = [cell],
      currentCell,
      adjacentCells;

  while(stack.length > 0) {
    currentCell = stack.pop();
    if(currentCell.visible){ continue; }

    currentCell.visible = true;
    adjacentCells = getAdjacentCells(currentCell);
    currentCell.adjacentBombs = adjacentCells.filter(({isBomb})=> isBomb)
                                             .length;

    // If no adjacent bombs, open the surrounding cells that aren't already visible
    if(!currentCell.adjacentBombs && !currentCell.isBomb) {
      stack = stack.concat(adjacentCells.filter(({visible})=> !visible));
    }
  }

  // TODO: potentially consider an Immutable-friendly solution (building new gameboards as you go)
  return gameBoard;

  // Internal helper functions:
  function getAdjacentCells({row, column}){
    return [
      getCell(row - 1, column - 1),
      getCell(row - 1, column),
      getCell(row - 1, column + 1),
      getCell(row, column - 1),
      getCell(row, column + 1),
      getCell(row + 1, column - 1),
      getCell(row + 1, column),
      getCell(row + 1, column + 1)
    ].filter((cell)=> cell); // Remove the undefined elements

    function getCell(row, column){
      // Javascript handles accessing Arrays out of bounds via `undefined`,
      // still, should probably just compare the bounds like an adult
      var rowObject = gameBoard[row];

      return rowObject && rowObject.cells[column];
    }
  }
}