// @ts-nocheck
// propsの型定義すること！

import React, { useState } from "react";
import { Button, Drawer } from "@material-ui/core";
import Box from "@mui/material/Box";

// ドローワーメニューのスタイル
const menuStyle = {
  background: "#AAA",
  height: "auto"
};
// 産地取得API実行を1回に制御するフラグ
let ApiAreasFlag = false;

export const Menu = (props) => {
  const [open, setopen] = useState(false);
  const toggleOpen = () => {
    setopen(!open);
  };

  const onClickNextPage = () => {
    // 特に処理はない
  };

  // 産地取得のAPI実行
  const onClickDoAPI = () => {
    // APIが未実行なら
    if (!ApiAreasFlag) {
      ApiAreasFlag = true;
      fetch("https://muro.sakenowa.com/sakenowa-data/api/areas", {
        mode: "cors"
      })
        .then((response) => {
          return response.json();
          // APIレスポンスはresponse.areas[n]{id:1, name:北海道}
        })
        .then((data) => {
          // 配列の中身をループで回して取得
          const arrayPre = [];
          const arrayPreId = [];
          data.areas.map((areas) => {
            arrayPre.push(areas.name);
            arrayPreId.push(areas.id);
            return 0;
          });
          // API実行結果をpropsに格納
          props.setPrefecture(arrayPre);
          props.setPrefectureId(arrayPreId);

          // 中身の確認;
          // data.areas.forEach((elm) => {
          //   Object.keys(elm).forEach((key) => {
          //     console.log(`key: ${key} value: ${elm[key]}`);
          //   });
          // });
        })
        .catch((error) => {
          alert("API実行時はCORS問題を解決すること。");
          console.log("失敗しました");
          ApiAreasFlag = false; // API未実行状態に
        });
    }
  };

  return (
    <>
      <div>
        <h3>メニュー</h3>
        <Button variant="outlined" onClick={toggleOpen}>
          open＞＞
        </Button>
        <Drawer anchor="left" open={open} onClose={toggleOpen}>
          <h4>どろわーメニュー</h4>
          <p>materialUIおためし</p>
          <Box m={1} mt={10} style={menuStyle}>
            <a
              href="https://muro.sakenowa.com/sakenowa-data/api/areas"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                onClick={() => onClickNextPage()}
              >
                産地一覧取得WEB遷移
              </Button>
            </a>
            <br />
            <br />
            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
              onClick={() => {
                onClickDoAPI();
              }}
            >
              産地一覧取得API実行
            </Button>
          </Box>
        </Drawer>
      </div>
    </>
  );
};
