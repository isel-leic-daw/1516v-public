import React from 'react';

export default class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {count: props.initialCount};    
  }
  onTick(){
    this.setState({count: this.state.count + 1});
  }
  render(){
    return (
      <div onClick={() => this.onTick()}>
        {this.state.count}
      </div>
    );
  }  
}
