import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Header } from './components/header';
import { Menu } from './components/menu';
import { StepBar } from './components/stepBar';
import { InitContents } from './components/initContents';
import { Footer } from './components/footer';
import { SelectArea } from './components/SelectArea';
import { RankingArea } from './components/RankingArea';
import { SelectFlavor } from './components/SelectFlavor';
import { MainProvider } from './providers/mainProvider';

export const App: React.FC = () => {
  // 表示フラグをOBJでまとめた
  const [contentsShowFlag, setContentsShowFlag] = useState({
    init: true, // 初期コンテンツエリアの表示フラグ
    stepBar: false, // StepBarの表示フラグ
    areas: false, // 「都道府県から選ぶ」の表示フラグ
    selectFlavor: false, // 「フレーバーから選ぶ」の表示フラグ
    ranking: false, // 「ランキング」の表示フラグ
  });

  // ステップバーの現在の段階
  const [nowStep, setNowStep] = useState(0);

  // スタブモードの状態を保持
  // mainProvider.tsxでグローバルステート化予定。完了すれば、以下は削除
  const [stubMode, setStubMode] = useState(true);

  // ドロワーメニューの開閉状態
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <MainProvider>
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
              contentsShowFlag={contentsShowFlag}
              setContentsShowFlag={setContentsShowFlag}
              setNowStep={setNowStep}
              stubMode={stubMode}
              setStubMode={setStubMode}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
            />
          </Box>
        </Grid>
        {/* ステップバー */}
        <Grid item xs={8}>
          <Box component="span" m={1} style={{ display: contentsShowFlag.stepBar ? '' : 'none' }}>
            <StepBar nowStep={nowStep} />
          </Box>
          {/* コンテンツ配置 */}
          <Box component="span" m={1} style={{ display: contentsShowFlag.init ? '' : 'none' }}>
            <div>
              <InitContents />
            </div>
          </Box>
          {contentsShowFlag.areas && <SelectArea setNowStep={setNowStep} stubMode={stubMode} />}
          {contentsShowFlag.selectFlavor && (
            <SelectFlavor setNowStep={setNowStep} stubMode={stubMode} />
          )}
          {contentsShowFlag.ranking && <RankingArea stubMode={stubMode} />}
          {/* フッター */}
        </Grid>
        <Grid item xs={12}>
          <Box component="span" m={5}>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </MainProvider>
  );
};
