import React from "react";
import { Styles } from "../styles";

function header() {
  return (
    <div style={Styles.headerContainer}>
      <h1 style={Styles.header}>Kitchen Diary</h1>
      <h1 style={{ fontSize: "20px", marginLeft: "600px" }}>UserName</h1>
      <h1 style={{ fontSize: "20px" }}>Log Out</h1>
    </div>
  );
}

export default header;
