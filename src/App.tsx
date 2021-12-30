import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Menu } from "./components/menu";
import { Header } from "./components/header";
import "./styles.css";

export const App = () => {
  const [prefecture, setPrefecture] = useState("都道府県");

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box component="span" m={5}>
            <Header>さけのわあぷり</Header>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box component="span" display="flex" m={1}>
            <Menu setPrefecture={setPrefecture} prefecture={prefecture} />
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box component="span" display="flex" m={1}>
            <div>
              <h3>コンテンツエリア</h3>
              <p>{prefecture}</p>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
