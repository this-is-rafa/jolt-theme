import React from "react";

const pageContent = (props) => (
  <div
    className="post-content"
    dangerouslySetInnerHTML={{ __html: props.content }}
  />
);

export default pageContent;
