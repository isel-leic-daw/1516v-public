import React from 'react';
import ReactDOM from 'react-dom';
import IssueItem from './IssueItem';
import IssuesList from './IssuesList';
import Counter from './Counter';
import IssueForm from './IssueForm';

let AppComponent = props => (
  <div>
    <IssuesList issues={props.issues} />
    <IssueForm />
    <Counter initialValue={10} />
  </div>
)

let renderApp = () => {
  ReactDOM.render(React.createElement(AppComponent, {issues}), 
    document.getElementById('placeholder'));
}

let issues = [
  {title:"issue 1", author:"Alice", id:1},
  {title:"issue 2", author:"Bob", id:2}
]

renderApp();
setTimeout(() => {
  issues.push({title:"issue 3", author:"Carol", id:3});
  renderApp();
}, 5000);
