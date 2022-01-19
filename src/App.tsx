import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Header } from "./components/header";
import { Menu } from "./components/menu";
import { StepBar } from "./components/stepBar";
import { InitContents } from "./components/initContents";
import { Footer } from "./components/footer";
import { SelectArea } from "./components/SelectArea";
import { RankingArea } from "./components/RankingArea";
import { SelectFlavor } from "./components/SelectFlavor";
import { SelectBland } from "./components/SelectBland";

export const App: React.FC = () => {
  // グローバスステートの管理方法どうするか決める

  // 表示フラグまとめたい
  // StepBarの表示フラグ
  const [stepBarShowFlag, setStepBarShowFlag] = useState(false);
  // 初期コンテンツエリアの表示フラグ
  const [initShowFlag, setinitShowFlag] = useState(true);
  // 「都道府県から選ぶ」の表示フラグ
  const [areasShowFlag, setAreasShowFlag] = useState(false);
  // 「フレーバーから選ぶ」の表示フラグ
  const [selectFlavorShowFlag, setSelectFlavorShowFlag] = useState(false);
  // 「銘柄から選ぶ」の表示フラグ
  const [selectBlandShowFlag, setSelectBlandShowFlag] = useState(false);
  // 「ランキング」の表示フラグ
  const [rankingShowFlag, setRankingShowFlag] = useState(false);

  // ステップバーの現在の段階
  const [nowStep, setNowStep] = useState(0);

  // スタブモードの状態を保持
  const [stubMode, setStubMode] = useState(true);

  // ドロワーメニューの開閉状態
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* ヘッダー */}
      <Grid container>
        <Grid item xs={12}>
          <Box component="span" m={5}>
            <Header setDrawerOpen={setDrawerOpen}>さけのわでりあくと</Header>
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
              setSelectFlavorShowFlag={setSelectFlavorShowFlag}
              setSelectBlandShowFlag={setSelectBlandShowFlag}
              setRankingShowFlag={setRankingShowFlag}
              stubMode={stubMode}
              setStubMode={setStubMode}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
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
            <SelectArea setNowStep={setNowStep} stubMode={stubMode} />
          )}
          {selectFlavorShowFlag && (
            <SelectFlavor setNowStep={setNowStep} stubMode={stubMode} />
          )}
          {selectBlandShowFlag && (
            <SelectBland setNowStep={setNowStep} stubMode={stubMode} />
          )}
          {rankingShowFlag && <RankingArea stubMode={stubMode} />}
          {/* フッター */}
        </Grid>
        <Grid item xs={12}>
          <Box component="span" m={5}>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
