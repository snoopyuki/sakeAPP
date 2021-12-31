import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Menu } from "./components/menu";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import "./styles.css";

export const App = () => {
  // APIで取得してきた都道府県を挿入
  const [prefecture, setPrefecture] = useState(["都", "道", "府", "県"]);
  // 配列をpropsで渡しても元値を上書きできないのでuseState使う
  const [prefectureId, setPrefectureId] = useState(["0", "1", "2", "3"]);
  // 蔵元一覧
  const [breweries, setBreweries] = useState(["蔵元", "表示"]);

  // 産地選択後に銘柄を取得する
  const onClickBreweriesGet = (pre, index) => {
    // prefecture[index]（押下された産地）に対応するprefectureId（API戻り値のID）を取得する方法
    // console.log(prefectureId[index]);

    // 蔵元一覧を取得
    fetch("https://muro.sakenowa.com/sakenowa-data/api/breweries", {
      mode: "cors"
    })
      .then((response) => {
        return response.json();
        // APIレスポンスはresponse.breweries[n]{id:1, name:蔵元, areaId:地域一覧のID}
      })
      .then((data) => {
        // 配列の中身をループで回して取得
        // 選択された産地の蔵元だけを抽出
        const arrayName = [];
        data.breweries.map((bre) => {
          // 地域が一致かつ蔵元名が空以外を抽出
          if (bre.areaId === prefectureId[index] && bre.name !== "") {
            arrayName.push(bre.name);
          }
        });
        // API実行結果をbreweriesに格納
        setBreweries(arrayName);
      })
      .catch((error) => {
        alert("API実行時はCORS問題を解決すること。");
        console.log("失敗しました");
      });
  };

  return (
    <>
      {/* ヘッダー */}
      <Grid container>
        <Grid item xs={12}>
          <Box component="span" m={5}>
            <Header>さけのわあぷり</Header>
          </Box>
        </Grid>
        {/* ドロワーメニューとAPI実行 */}
        <Grid item xs={4}>
          <Box component="span" m={1}>
            <Menu
              setPrefecture={setPrefecture}
              setPrefectureId={setPrefectureId}
            />
          </Box>
        </Grid>
        {/* コンテンツ配置 */}
        <Grid item xs={8}>
          <Box component="span" m={1}>
            <div>
              <h3>都道府県から探す</h3>
              {prefecture.map((pre, index) => {
                return (
                  <Button
                    key={pre}
                    variant="contained"
                    style={{ width: 100 }}
                    onClick={() => onClickBreweriesGet(pre, index)}
                  >
                    {pre}
                  </Button>
                );
              })}
            </div>
          </Box>
          <Box component="span" m={1}>
            <div>
              <h3>蔵元を指定する</h3>
              {breweries.map((bre, index) => {
                return (
                  <Button key={bre} variant="contained">
                    {bre}
                  </Button>
                );
              })}
            </div>
          </Box>
        </Grid>
        {/* フッター */}
        <Grid item xs={12}>
          <Box component="span" m={5}>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
