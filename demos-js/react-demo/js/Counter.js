import React from 'react';
export default class Counter extends React.Component{

  constructor(props){
    super(props);
    this.state = {value: props.initialValue || 0};
    this.up = () => {
      this.setState({value: this.state.value+1});
    }
    this.down = () => {
      this.setState({value: this.state.value-1});
    }
  }

  render(){
    return (
      <span>
        <button onClick={this.down} > down </button>
        {this.state.value}
        <button onClick={this.up} > up </button>
      </span>
    );
  }
}