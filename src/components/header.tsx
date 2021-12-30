// @ts-nocheck
// propsの型定義すること！

//import AppBar from "@mui/material/AppBar";

// スタイルは適当に試行錯誤中
const headerStyle = {
  position: "absolute",
  content: "",
  width: "100%",
  height: "30px",
  background: "#EEE",
  borderTopColor: "#0AA",
  borderTopStyle: "solid",
  borderTopWidth: "5px",
  // boxShadow: "none",
  // boxSizing: "border-box",
  //  left: "auto !important",
  borderBottom: "1px #ddd solid",
  // position: "relative !important",
  // borderTop: "5px solid #ffe100",

  // width: "100%",
  // zIndex: "99",
  // background: "#fff",
  // fontSize: "16px",

  // display: "block",
  // margin: "0",
  // padding: "0",
  // border: "0",
  // outline: "0"

  boxShadow: "0 0 8px rgb(0 0 0 / 20%)"
  // boxSizing: "border-box",
  // lineHeight: "1"
};

export const Header = (props) => {
  return <header style={headerStyle}>{props.children}</header>;
};
