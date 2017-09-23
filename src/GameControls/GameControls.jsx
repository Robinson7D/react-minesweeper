import React, { Component } from 'react';
import './GameControls.css';

const MIN_SIZE = 5;

class GameControls extends Component {
  constructor(props){
    super(props);
    this.state = {
      size: 10,
      sizeError: false,
    };

    this.onSizeChange = this.onSizeChange.bind(this);
  }

  onResetClick() {
    if(!this.state.sizeError){
      this.props.onRestartClick(this.state.size);
    }
  }

  onSizeChange(event){
    let size = event.target.value;

    this.setState({
      size: size,
      sizeError: +size < MIN_SIZE,
    });
  }

  _getSizeInputLabelClass(){
    let className = "Control BoardSizeControl";

    if(this.state.sizeError){ className += " error"; }

    return className;
  }

  render() {
    return (
      <section className="GameControls">
        <h3> Controls </h3>
        <div className="ControlsContainer">
          <label className={this._getSizeInputLabelClass()}>
            <span> Size: </span>
            <input type="number"
                   value={this.state.size}
                   onChange={(event)=> this.onSizeChange(event)}/>
          </label>
          <div className="ErrorMessage">
            Size must be at least {MIN_SIZE}
          </div>
        </div>

        <button type="text"
                className="RestartButton"
                onClick={()=> this.onResetClick()}>
          Restart
        </button>
      </section>
    );
  }
}

export default GameControls;