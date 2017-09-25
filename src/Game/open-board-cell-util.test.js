import React from 'react';
import ReactDOM from 'react-dom';
import openBoardCell from './open-board-cell-util.jsx';
import { buildCellRows, eachCell } from './cell-rows-util.jsx';

const BOMB_PLACER_DIAGONAL = (i, j)=> (i === j);


describe('opening a cell', function(){
  describe('opening a bomb', function(){
    var cellRows,
        bombCell;

    beforeEach(function(){
      cellRows = buildCellRows(3, {isBomb: BOMB_PLACER_DIAGONAL});
      bombCell = cellRows[0].cells[0];
    });

    test('sets the cell as visible', function(){
      expect(bombCell.visible).toBe(false);
      openBoardCell(bombCell, cellRows);
      expect(bombCell.visible).toBe(true);
    });

    test('does not set any other cells as visible', function(){
      expect(countVisibleCells(cellRows)).toBe(0);
      openBoardCell(bombCell, cellRows);
      expect(countVisibleCells(cellRows)).toBe(1);
    });
  });

  describe('opening a safe cell', function(){
    let cellRows;

    beforeEach(function(){
      cellRows = buildCellRows(5, {isBomb: BOMB_PLACER_DIAGONAL});
    });

    describe('with an adjacent bomb', function(){
      let row,
          column,
          cellToOpen,
          adjacentBomb,
          adjacentSafe;

      beforeEach(function(){
        row = 1;
        column = 0;
        cellToOpen = cellRows[row].cells[column];
        adjacentBomb = cellRows[row].cells[column + 1];
        adjacentSafe = cellRows[row + 1].cells[column];
      });

      test('spec is configured correctly', function(){
        expect(cellToOpen.isBomb).toBe(false);
        expect(adjacentBomb.isBomb).toBe(true);
        expect(adjacentSafe.isBomb).toBe(false);
      });

      test('sets the cell as visible', function(){
        expect(cellToOpen.visible).toBe(false);
        openBoardCell(cellToOpen, cellRows);
        expect(cellToOpen.visible).toBe(true);
      });

      test('does not set any other cells as visible', function(){
        expect(countVisibleCells(cellRows)).toBe(0);
        openBoardCell(cellToOpen, cellRows);
        expect(countVisibleCells(cellRows)).toBe(1);
      });
    });

    describe('with no adjacent bombs', function(){
      let row,
          column,
          cellToOpen,
          cellAboveAdjacentTwo;

      beforeEach(function(){
        row = 3;
        column = 0;
        cellToOpen = cellRows[row].cells[column];
        cellAboveAdjacentTwo = cellRows[row - 1].cells[column]; // Because diagonal
      });

      test('spec is configured correctly', function(){
        let adjacentCells = getAdjacentCells(cellRows, cellToOpen);

        expect(adjacentCells.length).toBe(5);
        expect(adjacentCells.filter(({isBomb})=> isBomb).length).toBe(0);
      });

      test('sets the cell as visible', function(){
        expect(cellToOpen.visible).toBe(false);
        openBoardCell(cellToOpen, cellRows);
        expect(cellToOpen.visible).toBe(true);
      });

      test('sets all of the other cells in the area as visile', function(){
        expect(countVisibleCells(cellRows)).toBe(0);
        openBoardCell(cellToOpen, cellRows);

        // 5x5 with top-left -> bottom-right diagonal as bombs leaves 4 open spaces,
        // when opening one of the empty corners:
        // X----
        // -X---
        // 12X--
        // 002X-
        // 001-X
        expect(countVisibleCells(cellRows)).toBe(8);
      });
    });
  });
});

function filterCells(cellRows, filterFn){
  let cells = [];

  eachCell(cellRows, function(cell){
    if(filterFn(cell)){ cells.push(cell); }
  });

  return cells;
}

function getAdjacentCells(cellRows, cell) {
  return filterCells(
    cellRows,
    (currentCell)=> cell !== currentCell
                 && Math.abs(cell.row - currentCell.row) <= 1
                 && Math.abs(cell.column - currentCell.column) <= 1
  );
}

function countVisibleCells(cellRows){
  return filterCells(cellRows, ({visible})=> visible).length;
}

function countVisibleBombs(cellRows){
  return filterCells(cellRows, ({visible, isBomb})=> visible && isBomb).length;
}

