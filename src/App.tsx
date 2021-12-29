import React, { useState } from "react";
import Box from "@mui/material/Box";

import Menu from "./components/menu";
import { Header } from "./components/header";
import "./styles.css";

export const App = () => {
  //  const [prefecture, setPrefecture] = useState(["11", "aa"]);

  return (
    <>
      <Box component="span" m={5}>
        <Header>さけのわあぷり</Header>
      </Box>
      <Box component="span" display="flex" m={1}>
        <div>
          <h3>メニュー</h3>
          <Menu />
        </div>
      </Box>
      <Box component="span" display="flex" m={1}>
        <div>{/* <p>{prefecture[0]}</p> */}</div>
      </Box>
    </>
  );
};
