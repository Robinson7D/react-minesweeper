import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import MinesweeperCell from './MinesweeperCell';

test('renders without crashing', function(){
  const div = document.createElement('div');

  ReactDOM.render(<MinesweeperCell />, div);
});

describe("component", function(){
  let mockOnClick,
      cellElement,
      defaultProps;

  beforeEach(function(){
    mockOnClick = jest.fn();
    defaultProps = {
      isBomb: true,
      visible: false,
      onClick: mockOnClick,
      adjacentBombs: null,
    };
    cellElement = getCellElement(defaultProps);
  });

  describe("default, closed cell", function(){
    test("is blank", function(){
      expect(getCellValue().text()).toBe('');
    });
    test("does not have .visible class", function(){
      expect(cellElement.hasClass('visible')).toBe(false);
    });
  });

  describe('opened (visible) cell', function(){
    beforeEach(function(){
      cellElement.setProps({visible: true});
    });

    test("has the .visible class", function(){
      expect(cellElement.hasClass('visible')).toBe(true);
    });

    describe("bomb", function(){
      beforeEach(()=> cellElement.setProps({isBomb: true}));

      test("shows a bomb emoji", function(){
        cellElement.setProps({isBomb: true});
        expect(getCellValue().text()).toMatch('💣');
      });

      test("has a .bomb class", function(){
        expect(cellElement.hasClass('bomb')).toBe(true);
      });
    });

    describe("non-bomb", function(){
      beforeEach(()=> cellElement.setProps({isBomb: false}));

      test("does not have a .bomb class", function(){
        expect(cellElement.hasClass('bomb')).toBe(false);
      });

      test("it shows the adjacent bombs number", function(){
        cellElement.setProps({adjacentBombs: 7,});
        expect(getCellValue().text()).toBe('7');
      });

      test("it is blank if no adjacent bombs", function(){
        cellElement.setProps({adjacentBombs: 0,});
        expect(getCellValue().text()).toBe('');
      });
    });
  });

  function getCellValue(){
    return cellElement.find('.CellValue');
  }
});

function getCellElement(props){
  return shallow(
    <MinesweeperCell {...props}/>
  );
}