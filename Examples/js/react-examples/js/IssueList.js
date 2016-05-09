import React from 'react';
import IssueItem from './IssueItem';

// export default props =>
//     React.createElement('ul', {}, 
//       props.issues.map(issue => React.createElement('li',{key:issue.id}, 
//         React.createElement(IssueItem, {issue:issue}))))

export default props =>
  <ul>
    {props.issues.map(issue => 
      <li key={issue.id}>
        <IssueItem issue={issue}/>
      </li>
    )}
  </ul>