import React from 'react';
import IssueItem from './IssueItem'

export default props => (
  <ul>
    {props.issues.map(issue => (
      <li key={issue.id} >
        <IssueItem issue={issue} />
      </li>
    ))}
  </ul>
)