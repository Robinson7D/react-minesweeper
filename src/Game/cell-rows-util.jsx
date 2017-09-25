export {
  buildCellRows,
  eachCell
};

// Functions:
function buildCellRows(size, {isBomb}={}){
  isBomb = isBomb || (()=> false);
  let i,
      j,
      cellRows = [], // Nested array for rows, columns
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
        isBomb: isBomb(i, j),
        adjacentBombs: null, // Will calculate lazily
        row: i,
        column: j,
      });
    }

    cellRows.push(currentRow);
  }

  return cellRows;
}

function eachCell(cellRows, fn){
  let i,
      j,
      currentRow,
      size = cellRows.length;

  for(i = 0; i < size; i++) {
    currentRow = cellRows[i];
    for(j = 0; j < size; j++) {
      fn(currentRow.cells[j]);
    }
  }
}