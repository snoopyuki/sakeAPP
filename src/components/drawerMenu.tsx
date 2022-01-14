// @ts-nocheck
// propsの型定義すること！

import React, { useState } from "react";
import {
  Button,
  Drawer,
  FormGroup,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import Box from "@mui/material/Box";
import {
  getApiUrlSakenowaAreas,
  getApiUrlSakenowaBrands,
  getApiUrlSakenowaBreweries,
  getApiUrlSakenowaFlavorCharts
} from "./getApiUrl";

// ドローワーメニューのスタイル
const menuStyle = {
  //  background: "#AAA",
  height: "auto"
};

export const DrawerMenu = (props) => {
  const { stubMode, setStubMode, drawerOpen, setDrawerOpen } = props;

  // ドロワーメニューの開閉状態変更
  const drawerToggleOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const onClickNextPage = () => {
    // 特に処理はない
    // aタグリンクよりクリックイベント拾う方が良い？
  };
  // CORS問題が出るAPIを実行
  const onClickCors = () => {
    fetch(getApiUrlSakenowaAreas())
      .then((response) => {
        // 処理なし
      })
      .catch((error) => {
        alert("API実行時はCORS問題を解決すること。");
        console.log("API実行に失敗しました");
      });
  };
  // テストしたい処理に書き換えて
  const onClickTest = () => {
    // テストしたい処理に書き換えて
  };

  // スタブモードの切替
  const onChangeStubMode = (event) => {
    setStubMode(event.target.checked);
    // コンテンツエリアの初期化処理を入れて方がいいかな
  };
  return (
    <Box m={1}>
      {/* メニューをヘッダーから開閉可能にしたのでコメントアウト */}
      {/* <Button
        variant="outlined"
        color="secondary"
        onClick={() => drawerToggleOpen()}
      >
        開発者メニュー＞＞
      </Button> */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => drawerToggleOpen()}
      >
        <h4>開発者メニュー</h4>
        <Box m={1} style={menuStyle}>
          <div>
            <a href={getApiUrlSakenowaAreas()} target="_blank" rel="noreferrer">
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="secondary"
                onClick={() => onClickNextPage()}
              >
                産地一覧WEB遷移
              </Button>
            </a>
          </div>
          {/* 処理まとめたい */}
          <div>
            <a
              href={getApiUrlSakenowaBrands()}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="secondary"
                onClick={() => onClickNextPage()}
              >
                銘柄一覧WEB遷移
              </Button>
            </a>
          </div>
          <div>
            <a
              href={getApiUrlSakenowaBreweries()}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="secondary"
                onClick={() => onClickNextPage()}
              >
                蔵元一覧WEB遷移
              </Button>
            </a>
          </div>
          <div>
            <a
              href={getApiUrlSakenowaFlavorCharts()}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="secondary"
                onClick={() => onClickNextPage()}
              >
                フレーバWEB遷移
              </Button>
            </a>
          </div>
          <br />
          <div>
            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="secondary"
              onClick={() => onClickCors()}
            >
              CORS問題再現
            </Button>
          </div>
          <div>
            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="secondary"
              onClick={() => onClickTest()}
            >
              いろいろテスト
            </Button>
          </div>
          <br />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={stubMode} onChange={onChangeStubMode} />
              }
              label="スタブモード"
              labelPlacement="start"
            />
          </FormGroup>
        </Box>
      </Drawer>
    </Box>
  );
};
