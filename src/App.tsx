// @ts-nocheck
// buildとすために暫定対策

import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Header } from "./components/header";
import { Menu } from "./components/menu";
import { StepBar } from "./components/stepBar";
import { InitContents } from "./components/initContents";
import { BrandDetail } from "./components/brandDetail";
import { Footer } from "./components/footer";
import { SelectArea } from "./components/SelectArea";

export const App = () => {
  // グローバスステートの管理方法どうするか決める

  // 表示フラグまとめたい
  // StepBarの表示フラグ
  const [stepBarShowFlag, setStepBarShowFlag] = useState(false);
  // 初期コンテンツエリアの表示フラグ
  const [initShowFlag, setinitShowFlag] = useState(true);
  // 都道府県エリアの表示フラグ
  const [areasShowFlag, setAreasShowFlag] = useState(false);

  // ステップバーの現在の段階
  const [nowStep, setNowStep] = useState(0);

  // スタブモードの状態を保持
  const [stubMode, setStubMode] = useState(true);

  return (
    <>
      {/* ヘッダー */}
      <Grid container>
        <Grid item xs={12}>
          <Box component="span" m={5}>
            <Header>さけのわでりあくと</Header>
          </Box>
        </Grid>
        {/* ドロワーメニューとAPI実行 */}
        <Grid item xs={4}>
          <Box component="span" m={1}>
            <Menu
              setNowStep={setNowStep}
              setStepBarShowFlag={setStepBarShowFlag}
              setinitShowFlag={setinitShowFlag}
              setAreasShowFlag={setAreasShowFlag}
              stubMode={stubMode}
              setStubMode={setStubMode}
            />
          </Box>
        </Grid>
        {/* ステップバー */}
        <Grid item xs={8}>
          <Box
            component="span"
            m={1}
            style={{ display: stepBarShowFlag ? "" : "none" }}
          >
            <StepBar nowStep={nowStep} />
          </Box>
          {/* コンテンツ配置 */}
          <Box
            component="span"
            m={1}
            style={{ display: initShowFlag ? "" : "none" }}
          >
            <div>
              <InitContents />
            </div>
          </Box>
          {areasShowFlag && (
            <SelectArea
              setNowStep={setNowStep}
              setStepBarShowFlag={setStepBarShowFlag}
              areasShowFlag={areasShowFlag}
              setAreasShowFlag={setAreasShowFlag}
              stubMode={stubMode}
              setStubMode={setStubMode}
            />
          )}
          {/* フッター */}
          <Grid item xs={12}>
            <Box component="span" m={5}>
              <Footer />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
