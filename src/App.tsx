import React from "react";
import Box from "@mui/material/Box";

import Menu from "./components/menu";
import { Header } from "./components/header";
import "./styles.css";

export const App = () => {
  return (
    <>
      <Box component="span" m={5}>
        <Header>さけのわあぷり</Header>
      </Box>
      <Box component="span" display="flex" m={1}>
        <div>
          <h1>Hello</h1>
          <h3>メニュー</h3>
          <Menu />
        </div>
      </Box>
      <Box component="span" display="flex" m={1}>
        <div>
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>
      </Box>
    </>
  );
};
