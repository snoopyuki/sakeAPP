import React from 'react';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';

import { DrawerMenu } from './drawerMenu';

type PropsType = {
  setNowStep: (param: number) => void;
  setStepBarShowFlag: (param: boolean) => void;
  setinitShowFlag: (param: boolean) => void;
  setAreasShowFlag: (param: boolean) => void;
  setRankingShowFlag: (param: boolean) => void;
  stubMode: boolean;
  setStubMode: (param: boolean) => void;
};

export const Menu = (props: PropsType) => {
  const {
    setNowStep,
    setStepBarShowFlag,
    setinitShowFlag,
    setAreasShowFlag,
    setRankingShowFlag,
    stubMode,
    setStubMode,
  } = props;
  // 産地取得のAPI実行
  const onClickArea = () => {
    // ステップバーの表示を更新
    setNowStep(0);
    setStepBarShowFlag(true);
    setinitShowFlag(false);
    setAreasShowFlag(true);
    setRankingShowFlag(false);
  };

  const onClickRanking = () => {
    setStepBarShowFlag(false);
    setinitShowFlag(false);
    setAreasShowFlag(false);
    setRankingShowFlag(true);
  };

  return (
    <>
      <h3>メニュー</h3>
      <Box m={2}>
        <Button style={{ width: '60%' }} variant="contained" color="primary" onClick={onClickArea}>
          産地から選ぶ
        </Button>
        <Button style={{ width: '60%' }} disabled={true} variant="contained" color="primary">
          フレーバーから選ぶ
        </Button>
        <Button
          style={{ width: '60%' }}
          variant="contained"
          color="primary"
          onClick={onClickRanking}
        >
          ランキング
        </Button>
      </Box>
      <DrawerMenu stubMode={stubMode} setStubMode={setStubMode} />
    </>
  );
};
