import React from 'react';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';

import { DrawerMenu } from './drawerMenu';

type PropsType = {
  setNowStep: (param: number) => void;
  setStepBarShowFlag: (param: boolean) => void;
  setinitShowFlag: (param: boolean) => void;
  setAreasShowFlag: (param: boolean) => void;
  setSelectFlavorShowFlag: (param: boolean) => void;
  setRankingShowFlag: (param: boolean) => void;
  stubMode: boolean;
  setStubMode: (param: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (param: boolean) => void;
};

export const Menu: React.FC<PropsType> = (props: PropsType) => {
  const {
    setNowStep,
    setStepBarShowFlag,
    setinitShowFlag,
    setAreasShowFlag,
    setSelectFlavorShowFlag,
    setRankingShowFlag,
    stubMode,
    setStubMode,
    drawerOpen,
    setDrawerOpen,
  } = props;

  const onClickArea = () => {
    // ステップバーの表示を更新
    setNowStep(0);
    setStepBarShowFlag(true);
    setinitShowFlag(false);
    setAreasShowFlag(true);
    setSelectFlavorShowFlag(false);
    setRankingShowFlag(false);
  };

  const onClickRanking = () => {
    setStepBarShowFlag(false);
    setinitShowFlag(false);
    setAreasShowFlag(false);
    setSelectFlavorShowFlag(false);
    setRankingShowFlag(true);
  };

  const onClickFlavor = () => {
    setStepBarShowFlag(false);
    setinitShowFlag(false);
    setAreasShowFlag(false);
    setSelectFlavorShowFlag(true);
    setRankingShowFlag(false);
  };

  return (
    <>
      <h3>メニュー</h3>
      <Box m={2}>
        <Button style={{ width: '60%' }} variant="contained" color="primary" onClick={onClickArea}>
          産地から選ぶ
        </Button>
        <Button
          style={{ width: '60%' }}
          variant="contained"
          color="primary"
          onClick={onClickFlavor}
        >
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
      <DrawerMenu
        stubMode={stubMode}
        setStubMode={setStubMode}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </>
  );
};
