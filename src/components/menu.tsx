import React from 'react';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';

import { DrawerMenu } from './drawerMenu';

type ContentsShoFlagType = {
  init: boolean;
  stepBar: boolean;
  areas: boolean;
  selectFlavor: boolean;
  ranking: boolean;
};
type PropsType = {
  contentsShowFlag: ContentsShoFlagType;
  setContentsShowFlag: (param: ContentsShoFlagType) => void;
  setNowStep: (param: number) => void;
  setSelectFlavorShowFlag: (param: boolean) => void;
  setRankingShowFlag: (param: boolean) => void;
  stubMode: boolean;
  setStubMode: (param: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (param: boolean) => void;
};

export const Menu: React.FC<PropsType> = (props: PropsType) => {
  const {
    contentsShowFlag,
    setContentsShowFlag,
    setNowStep,
    stubMode,
    setStubMode,
    drawerOpen,
    setDrawerOpen,
  } = props;

  const onClickArea = () => {
    // ステップバーの表示を更新
    setNowStep(0);
    // 産地から選ぶ押下時：ステップバーと産地を表示
    setContentsShowFlag({
      ...contentsShowFlag, // 要らないけど分割代入の書き方メモ
      init: false,
      stepBar: true,
      areas: true,
      selectFlavor: false,
      ranking: false,
    });
  };

  const onClickRanking = () => {
    // ランキングボタン押下時：ランキングを表示
    setContentsShowFlag({
      init: false,
      stepBar: false,
      areas: false,
      selectFlavor: false,
      ranking: true,
    });
  };

  const onClickFlavor = () => {
    // フレーバーから選ぶ押下時：フレーバーを表示
    setContentsShowFlag({
      init: false,
      stepBar: false,
      areas: false,
      selectFlavor: true,
      ranking: false,
    });
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
