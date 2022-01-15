// @ts-nocheck
// propsの型定義すること！

import React from 'react';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';

import { DrawerMenu } from './drawerMenu';
import { getApiUrlAreas } from './getApiUrl';

export const Menu = (props) => {
  const {
    setNowStep,
    setStepBarShowFlag,
    setinitShowFlag,
    setAreasShowFlag,
    stubMode,
    setStubMode,
  } = props;
  // 産地取得のAPI実行
  const onClickArea = () => {
    // ステップバーの表示を更新
    setNowStep(0);
    // 初期表示時コンテンツエリアの表示フラグをリセット
    setStepBarShowFlag(true);
    setinitShowFlag(false);
    setAreasShowFlag(true);
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
        <Button style={{ width: '60%' }} disabled={true} variant="contained" color="primary">
          ランキング
        </Button>
      </Box>
      <DrawerMenu stubMode={stubMode} setStubMode={setStubMode} />
    </>
  );
};
