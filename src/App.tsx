import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Menu } from "./components/menu";
import { Header } from "./components/header";
import "./styles.css";

export const App = () => {
  // APIで取得してきた都道府県を挿入
  const [prefecture, setPrefecture] = useState(["都", "道", "府", "県"]);
  // 配列をpropsで渡しても元値を上書きできないのでuseState使う
  const [prefectureId, setPrefectureId] = useState(["0", "1", "2", "3"]);

  return (
    <>
      {/* ヘッダー */}
      <Grid container>
        <Grid item xs={12}>
          <Box component="span" m={5}>
            <Header>さけのわあぷり</Header>
          </Box>
        </Grid>
        {/* ドロワーメニューとAPI実行 */}
        <Grid item xs={4}>
          <Box component="span" m={1}>
            <Menu
              setPrefecture={setPrefecture}
              setPrefectureId={setPrefectureId}
            />
          </Box>
        </Grid>
        {/* 都道府県の配置 */}
        <Grid item xs={8}>
          <Box component="span" m={1}>
            <div>
              <h3>コンテンツエリア</h3>
              {prefecture.map((pre, index) => {
                return (
                  <Button key={pre} variant="contained" style={{ width: 100 }}>
                    {pre}
                  </Button>
                );
              })}
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
