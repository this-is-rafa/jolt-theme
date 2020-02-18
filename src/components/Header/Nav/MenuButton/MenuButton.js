import React from "react";

const menuButton = props => {
  const topClasses = "hamburger__open-line hamburger__open-line--top ";
  const bottomClasses = "hamburger__open-line hamburger__open-line--bottom ";

  return (
    <div className="hamburger" onClick={props.clicked}>
      <div
        className={
          props.open
            ? `${topClasses} hamburger__open-line--rotate-top`
            : topClasses
        }
      ></div>
      <div
        className={
          props.open
            ? `${bottomClasses} hamburger__open-line--rotate-bottom`
            : bottomClasses
        }
      ></div>
    </div>
  );
};

export default menuButton;
