// @ts-nocheck
// propsの型定義すること！

import React from "react";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";

import { DrawerMenu } from "./drawerMenu";

// 産地取得API実行を1回に制御するフラグ
let ApiAreasFlag = false;

export const Menu = (props) => {
  // 産地取得のAPI実行
  const onClickDoAPI = () => {
    // ステップバーの表示を更新
    props.setNowStep(0);
    // 初期表示時コンテンツエリアの表示フラグをリセット
    props.setStepBarShowFlag(true);
    props.setinitShowFlag(false);
    props.setAreasShowFlag(true);
    props.setBreweriesShowFlag(false);
    props.setBrandsShowFlag(false);
    props.setBrandDetailShowFlag(false);
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
          const arrayPrefectureSelectFlag = [];
          data.areas.map((areas) => {
            arrayPre.push(areas.name);
            arrayPreId.push(areas.id);
            arrayPrefectureSelectFlag.push(false);
            return 0;
          });
          // API実行結果をpropsに格納
          props.setPrefecture(arrayPre);
          props.setPrefectureId(arrayPreId);
          props.setPrefectureSelectFlag(arrayPrefectureSelectFlag);

          // 中身の確認;
          // data.areas.forEach((elm) => {
          //   Object.keys(elm).forEach((key) => {
          //     console.log(`key: ${key} value: ${elm[key]}`);
          //   });
          // });
        })
        .catch((error) => {
          alert(
            'API実行時はCORS問題を解決すること。 --disable-web-security --user-data-dir="ディレクトリ"'
          );
          console.log("失敗しました");
          ApiAreasFlag = false; // API未実行状態に
        });
    }
  };

  return (
    <>
      <h3>メニュー</h3>
      <Box m={2}>
        <Button
          style={{ width: "60%" }}
          variant="contained"
          color="primary"
          onClick={() => {
            onClickDoAPI();
          }}
        >
          産地から選ぶ
        </Button>
        <Button style={{ width: "60%" }} variant="contained" color="primary">
          ランキング？
        </Button>
      </Box>
      <DrawerMenu />
    </>
  );
};
