import React from 'react';

export default class IssueForm extends React.Component{
  constructor(props){
    super(props);
    this.state = { issue:{title:'', author:''} };     
  }

  render(){
    console.log('render')
    return (
      <form>
        <input type='text' placeholder='title (required)' value={this.state.issue.title}
          onChange={(e)=>this.setState({
            issue:{
              title:e.target.value,
              author:this.state.issue.author,
            }})}
          />
        <input type='text' placeholder='author (required)' value={this.state.issue.author}
          onChange={(e)=>this.setState({
            issue:{
              title:this.state.issue.title,
              author:e.target.value,
            }})}
        />
      </form>
    );
  }
}