import React from 'react';
export default props => (
    <dl>
      <dt>Title</dt>
      <dd>{props.issue.title}</dd>
      <dt>Author</dt>
      <dd>{props.issue.author}</dd>
    </dl>
);