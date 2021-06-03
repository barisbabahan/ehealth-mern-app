import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="container">
      <div className="a">
        <div className="b"></div>
        <div className="c"></div>
      </div>
      <h1 style={{ fontSize: "1.313rem", lineHeight: 1.2 }}>
        <span>Loading...</span>
      </h1>
    </div>
  );
};

export default Loading;
