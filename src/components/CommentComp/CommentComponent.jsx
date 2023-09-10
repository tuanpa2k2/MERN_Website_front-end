import React from "react";
import "./CommentComponent.scss";

const CommentComponent = (props) => {
  const { dataHref, width } = props;

  return (
    <div className="wrapper-commentComp">
      <div className="fb-comments" data-href={dataHref} data-width={width} data-numposts="5"></div>
    </div>
  );
};

export default CommentComponent;
