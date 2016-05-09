import React from 'react';
import ReactDom from 'react-dom';
import IssueList from './IssueList';
import Counter from './Counter';
import IssueForm from './IssueForm';

function makeElement(){
  return React.createElement('div', {},
    React.createElement('h2', {}, 'The heading 2'),
    React.createElement('p',{}, 'The paragraph'));
}

ReactDom.render(makeElement(), document.getElementById('placeholder'));

function delay(time, action){
  return new Promise((f,r) => {
    setTimeout(()=>f(action()), time);
  });
}

let issues = [
  {title: 'issue 1', author: 'Alice', id: 1},
  {title: 'issue 2', author: 'Bob', id: 2}
];

function makeIssuesElement(issues){
  return React.createElement('div', {},
    React.createElement('h2', {}, 'Issue'),
    React.createElement('ul', {},
      issues.map(issue => React.createElement('li', {key:issue.id},
        React.createElement('dl', {},
          React.createElement('dt', {}, 'Title'),
          React.createElement('dd', {}, issue.title),
          React.createElement('dt', {}, 'Author'),
          React.createElement('dd', {}, issue.author))))));
}

function makeIssuesElement2(issues){
  return React.createElement('div', {},
    React.createElement('h2', {}, 'Issue'),
    React.createElement(IssueForm, {}),
    React.createElement(Counter, {initialCount:0}),
    React.createElement(IssueList, {issues:issues}));
}

delay(2000, () => ReactDom.render(makeIssuesElement2(issues), document.getElementById('placeholder')))
.then(() => delay(2000, () => {
  issues.push({title: 'issue 3', author: 'Carol', id: 3});
  ReactDom.render(makeIssuesElement2(issues), document.getElementById('placeholder'));
}));

