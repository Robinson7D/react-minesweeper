import React from 'react';
import ReactDOM from 'react-dom';
import getGameCondition from './get-game-condition-util.jsx';
import { buildCellRows, eachCell } from './cell-rows-util.jsx';

describe('board states', function(){
  let cellRows;

  beforeEach(function(){
    cellRows = buildCellRows(5, {isBomb: ()=> false});
  });

  test('new state', function(){
    expect(getGameCondition(cellRows)).toBe('new');
  });

  test('progress state', function(){
    cellRows[0].cells[0].visible = true;
    expect(getGameCondition(cellRows)).toBe('active');

    cellRows[0].cells[0].visible = false;
    expect(getGameCondition(cellRows)).toBe('new');

    cellRows[1].cells[1].visible = true;
    cellRows[0].cells[1].visible = true;
    expect(getGameCondition(cellRows)).toBe('active');
  });

  test('win state', function(){
    eachCell(cellRows, (cell)=> cell.visible = true);

    expect(getGameCondition(cellRows)).toBe('win');
  });

  test('lose state', function(){
    cellRows[0].cells[0].visible = true;
    cellRows[0].cells[0].isBomb = true;

    expect(getGameCondition(cellRows)).toBe('lose');
  });
});