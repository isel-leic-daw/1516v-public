import React from 'react';

export default class IssueForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:'', author:''  
    };
    
    this.handleClick = (e) => {
      console.log(this.state.title);
      e.preventDefault();
    }
  }

  handleTitleChange(e){
    this.state.title = e.target.value.substring(0,4);
    this.setState(this.state);
  }

  render(){
    return (
      <form>
        <input type='text' value={this.state.title} 
            onChange={this.handleTitleChange.bind(this)} />
        <input type='text' value={this.state.author} />
        <button onClick={this.handleClick}> add </button>
      </form>
    )
  }
}