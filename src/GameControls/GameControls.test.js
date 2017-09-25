import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import GameControls from './GameControls';
import getDefaultControlValues from './get-default-control-values.jsx';

test('renders without crashing', function(){
  const div = document.createElement('div');

  ReactDOM.render(<GameControls />, div);
});

describe('component api', function(){
  test("accepts an onSubmit function", function(){
    let mockOnSubmit = jest.fn(),
        controlsElement = getControlsElement({onSubmit: mockOnSubmit}),
        props = controlsElement.instance().props;

    expect(props.onSubmit).toBe(mockOnSubmit);
    expect(mockOnSubmit.mock.calls.length).toBe(0);
    props.onSubmit();
    expect(mockOnSubmit.mock.calls.length).toBe(1);
  });
});

describe('inputs', function(){
  let mockOnSubmit,
      controlsElement;

  beforeEach(function(){
    mockOnSubmit = jest.fn();
    controlsElement = getControlsElement({onSubmit: mockOnSubmit});
  });

  describe("size input", function(){
    let sizeInputWrapper;
    beforeEach(function(){
      sizeInputWrapper = controlsElement.find('.BoardSizeControl');
    });

    test("defaults to getDefaultControlValues().size", function(){
      let inputValue = sizeInputWrapper.find('input').props().value;

      expect(inputValue).toBe(getDefaultControlValues().size);
    });

    test("only accepts numbers >= 5", function(){
      expect(controlsElement.instance().state.sizeError).toBe(false);

      sizeInputWrapper.find('input').simulate('change', {target: {value: 4}});
      expect(controlsElement.instance().state.sizeError).toBe(true);

      sizeInputWrapper.find('input').simulate('change', {target: {value: 5}});
      expect(controlsElement.instance().state.sizeError).toBe(false);
    });

    test("only accepts numbers <= 100", function(){
      expect(controlsElement.instance().state.sizeError).toBe(false);

      sizeInputWrapper.find('input').simulate('change', {target: {value: 101}});
      expect(controlsElement.instance().state.sizeError).toBe(true);

      sizeInputWrapper.find('input').simulate('change', {target: {value: 100}});
      expect(controlsElement.instance().state.sizeError).toBe(false);
    });

    test("by default, no error is rendered", function(){
      expect(getErrorElement('.BoardSizeControl').length).toBe(0);
    });

    describe("errors", function(){
      let errorWrapper;
      beforeEach(function(){
        controlsElement.setState({sizeError: true});
        errorWrapper = getErrorElement('.BoardSizeControl');
      });

      test("the error message describes the bounds", function(){
        expect(errorWrapper.text()).toMatch("between 5 and 100");
      });

      test("the input-wrapper gains an error class", function(){
        expect(controlsElement.find('.BoardSizeControl.error').length).toBe(1);
      });
    });
  });

  describe("difficulty input", function(){
    let difficultyInputWrapper;
    beforeEach(function(){
      difficultyInputWrapper = controlsElement.find('.DifficultyControl');
    });

    test("defaults to getDefaultControlValues().difficulty", function(){
      let inputValue = difficultyInputWrapper.find('select').props().value;

      expect(inputValue).toBe(getDefaultControlValues().difficulty);
    });

    test("only accepts numbers >= -1", function(){
      expect(controlsElement.instance().state.difficultyError).toBe(false);

      difficultyInputWrapper.find('select').simulate('change', {target: {value: -2}});
      expect(controlsElement.instance().state.difficultyError).toBe(true);

      difficultyInputWrapper.find('select').simulate('change', {target: {value: -1}});
      expect(controlsElement.instance().state.difficultyError).toBe(false);
    });

    test("only accepts numbers <= 4", function(){
      expect(controlsElement.instance().state.difficultyError).toBe(false);

      difficultyInputWrapper.find('select').simulate('change', {target: {value: 5}});
      expect(controlsElement.instance().state.difficultyError).toBe(true);

      difficultyInputWrapper.find('select').simulate('change', {target: {value: 4}});
      expect(controlsElement.instance().state.difficultyError).toBe(false);
    });

    test("by default, no error is rendered", function(){
      expect(getErrorElement('.DifficultyControl').length).toBe(0);
    });

    test("an error message appears for invalid difficulties", function(){
      controlsElement.setState({difficultyError: true});

      expect(controlsElement.find('.DifficultyControl.error').length).toBe(1);
      expect(controlsElement.find('.DifficultyControl + .ErrorMessage').length).toBe(1);
    });
  });

  describe("submit", function(){
    let mockPreventDefault;

    beforeEach(function(){
      mockPreventDefault = jest.fn();
    });

    test("it triggers onSubmit", function(){
      expect(mockOnSubmit.mock.calls.length).toBe(0);
      triggerSubmit();
      expect(mockOnSubmit.mock.calls.length).toBe(1);
    });

    test("prevents default (prevents page reload on form submit)", function(){
      expect(mockPreventDefault.mock.calls.length).toBe(0);
      triggerSubmit();
      expect(mockPreventDefault.mock.calls.length).toBe(1);
    });

    describe("form with a size error", _getSubmitTestsForErrorKey('sizeError'));
    describe("form with a difficulty error", _getSubmitTestsForErrorKey('difficultyError'));

    function _getSubmitTestsForErrorKey(errorKey){
      return function(){
        beforeEach(function(){
          controlsElement.setState({[errorKey]: true});
        });

        test("it does not trigger onSubmit", function(){
          expect(mockOnSubmit.mock.calls.length).toBe(0);
          triggerSubmit();
          expect(mockOnSubmit.mock.calls.length).toBe(0);
        });

        test("prevents default (prevents page reload on form submit)", function(){
          expect(mockPreventDefault.mock.calls.length).toBe(0);
          triggerSubmit();
          expect(mockPreventDefault.mock.calls.length).toBe(1);
        });
      }
    }

    function triggerSubmit(){
      controlsElement.simulate('submit', {preventDefault: mockPreventDefault});
    }
  });

  describe("RestartButton", function(){
    it('triggers submit', function(){
      expect(mockOnSubmit.mock.calls.length).toBe(0);
      controlsElement.find('.RestartButton').simulate('click');
      expect(mockOnSubmit.mock.calls.length).toBe(0);
    });
  });

  // Helpers for describe('inputs', fn):
  function getErrorElement(controlClass){
    return controlsElement.find(controlClass + ' + .ErrorMessage');
  }
});

function getControlsElement(props){
  return shallow(
    <GameControls onSubmit={props.onSubmit}/>
  );
}