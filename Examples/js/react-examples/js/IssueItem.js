import React from 'react';

// export default props =>
//   React.createElement('dl', {key:props.issue.id},
//     React.createElement('dt', {}, 'Title'),
//       React.createElement('dd', {}, props.issue.title),
//       React.createElement('dt', {}, 'Author'),
//       React.createElement('dd', {}, props.issue.author))

export default props =>
  <dl key={props.issue.id}>
    <dt>Title</dt>
    <dd>{props.issue.title}</dd>
    <dt>Author</dt>
    <dd>{props.issue.author}</dd>
  </dl>
