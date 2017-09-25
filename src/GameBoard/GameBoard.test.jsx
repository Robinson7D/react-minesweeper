import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import GameBoard from './GameBoard';
import { buildCellRows } from '../Game/cell-rows-util.jsx';

test('renders without crashing', function(){
  const div = document.createElement('div'),
        cellRows = buildCellRows(3);

  ReactDOM.render(<GameBoard cellRows={cellRows}/>, div);
});

describe("component", function(){
  let size,
      cellRows,
      gameBoardElement,
      mockCellClick;

  beforeEach(function(){
    size = 6;
    cellRows = buildCellRows(size);
    mockCellClick = jest.fn();
    gameBoardElement = getGameBoardElement({cellRows, onCellClick: mockCellClick});
  });

  test("the board has a .BoardRow-count equal to the board-size", function(){
    expect(gameBoardElement.find('.BoardRow').length).toBe(size);

    let testSize = size - 3,
        testCellRows = buildCellRows(testSize),
        testBoardElement = getGameBoardElement({cellRows: testCellRows});

    expect(testBoardElement.find('.BoardRow').length).toBe(testSize);
  });

  test("the board has size-squared cells", function(){
    expect(gameBoardElement.find('MinesweeperCell').length).toBe(size * size);
  });

  test("propogates clicks on a cell", function(){
    let cellNum = 3,
        cell = cellRows[0].cells[cellNum],
        cellElement = gameBoardElement.find('MinesweeperCell').at(cellNum);

    expect(mockCellClick.mock.calls.length).toBe(0);
    cellElement.simulate('click');
    expect(mockCellClick.mock.calls.length).toBe(1);
    expect(mockCellClick.mock.calls[0][0]).toBe(cell); // First arg of the propogated click is the cell data
  });
});

function getGameBoardElement(props){
  return shallow(
    <GameBoard {...props}/>
  );
}