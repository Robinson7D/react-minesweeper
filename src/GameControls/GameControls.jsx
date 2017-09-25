import React, { Component } from 'react';
import getDefaultControlValues from './get-default-control-values.jsx';
import './GameControls.css';

const MIN_SIZE = 5;
const MAX_SIZE = 100;

class GameControls extends Component {
  constructor(props){
    super(props);
    this.state = Object.assign(getDefaultControlValues(), {
      sizeError: false,
      difficultyError: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if(!(this.state.sizeError || this.state.difficultyError)){
      this.props.onSubmit({
        size: this.state.size,
        difficulty: this.state.difficulty,
      });
    }
    return false;
  }

  onSizeChange(event){
    let size = +event.target.value;

    this.setState({
      size: size,
      sizeError: size < MIN_SIZE || size > MAX_SIZE,
    });
  }

  onDifficultyChange(event){
    let difficulty = event.target.value;

    this.setState({
      difficulty: +difficulty,
      difficultyError: difficulty < -1 || difficulty > 4,
    });
  }

  _getSizeInputLabelClass(){
    let className = "Control BoardSizeControl";

    if(this.state.sizeError){ className += " error"; }

    return className;
  }

  _getDifficultyInputLabelClass(){
    let className = "Control DifficultyControl";

    if(this.state.difficultyError){ className += " error"; }

    return className;
  }

  _errorMessage(errorCondition, message) {
    if(!errorCondition){ return; }

    return <div className="ErrorMessage">{message}</div>
  }

  render() {
    return (
      <form className="GameControls" onSubmit={(...args)=> this.handleSubmit(...args)}>
        <h3> Controls </h3>
        <div className="ControlsContainer">
          <label className={this._getSizeInputLabelClass()}>
            <span> Size: </span>
            <input type="number"
                   value={this.state.size}
                   onChange={(event)=> this.onSizeChange(event)}/>
          </label>
          {this._errorMessage(this.state.sizeError, `Size must be between ${MIN_SIZE} and ${MAX_SIZE}`)}

          <label className={this._getDifficultyInputLabelClass()}>
            <span> Difficulty: </span>
            <select value={this.state.difficulty}
                    onChange={(event)=> this.onDifficultyChange(event)}>
              <option value="0"> Super Easy </option>
              <option value="1"> Easy </option>
              <option value="2"> Medium </option>
              <option value="3"> Hard </option>
              <option value="4"> Very Hard </option>
              <option value="-1"> So Hard It's Easy </option>
            </select>
          </label>
          {this._errorMessage(this.state.difficultyError, 'Invalid difficulty selection')}
        </div>

        <button type="submit"
                className="RestartButton">
          Restart
        </button>
      </form>
    );
  }
}

export default GameControls;