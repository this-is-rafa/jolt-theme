import React from "react";

const postContent = props => (
  <div
    className="post-content"
    dangerouslySetInnerHTML={{ __html: props.content }}
  />
);

export default postContent;
