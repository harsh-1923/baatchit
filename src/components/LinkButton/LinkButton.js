import React from "react";
import "./linkbutton.css";
import { Link } from "react-router-dom";

const LinkButton = ({ path, content, primary, small }) => {
  const background = primary ? "#FF7597" : "#424242";
  const main = primary ? "black" : "white";
  const whidth = small ? "80px" : "100px";
  return (
    <div
      className="link-wrapper"
      style={{ backgroundColor: background, minWidth: whidth }}
    >
      <Link style={{ color: main }} className="link" to={path}>
        {content}
      </Link>
    </div>
  );
};

export default LinkButton;
