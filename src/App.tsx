import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Menu } from "./components/menu";
import { Header } from "./components/header";
import { StepBar } from "./components/stepBar";
import { Footer } from "./components/footer";
import "./styles.css";

export const App = () => {
  // useStateの変数をまとめたい
  // APIで取得してきた都道府県を挿入
  const [prefecture, setPrefecture] = useState(["都", "道", "府", "県"]);
  // APIで取得した都道府県のID。上記とまとめてOBJ化したい。
  // 配列をpropsで渡しても元値を上書きできないのでuseState使う
  const [prefectureId, setPrefectureId] = useState(["0", "1", "2", "3"]);
  // 都道府県の選択フラグ
  const [prefectureSelectFlag, setPrefectureSelectFlag] = useState([
    false,
    true,
    false,
    true
  ]);
  // 蔵元一覧
  const [breweries, setBreweries] = useState(["蔵元", "表示"]);
  // 蔵元一覧のID。蒸気とまとめてOBJ化したい
  const [breweriesId, setBreweriesId] = useState(["0", "1"]);

  // 銘柄一覧
  const [brands, setBrands] = useState(["銘柄"]);

  // 表示フラグまとめたい
  // StepBarの表示フラグ
  const [stepBarShowFlag, setStepBarShowFlag] = useState(false);
  // 銘柄コンテンツエリアの制御フラグ
  const [brandsShowFlag, setBrandsShowFlag] = useState(false);

  // 産地選択後に銘柄を取得する
  const onClickBreweriesGet = (pre, index, setPrefectureSelectFlag) => {
    // prefecture[index]（押下された産地）に対応するprefectureId（API戻り値のID）を取得する方法
    // console.log(prefectureId[index]);

    // 選択されたボタンを非活性にするようにフラグ更新
    const arrayFlag = prefectureSelectFlag;
    // 現在trueになっているフラグをリセットする
    arrayFlag.fill(false);
    arrayFlag[index] = true;
    setPrefectureSelectFlag(arrayFlag);

    // 蔵元一覧を取得
    fetch("https://muro.sakenowa.com/sakenowa-data/api/breweries", {
      mode: "cors"
    })
      .then((response) => {
        return response.json();
        // APIレスポンスはresponse.breweries[n]{id:1, name:蔵元, areaId:地域一覧のID}
      })
      .then((data) => {
        // ToDo API実行を1回だけにしたい。
        // 実行有無フラグをグローバルに持たせて、OBJはディープコピーすること。
        // 一度OBJをJSON形式に戻して再代入するとスムーズ。
        // 配列の中身をループで回して取得
        // 選択された産地の蔵元だけを抽出
        const arrayName = [];
        const arrayNameId = [];
        data.breweries.map((bre) => {
          // 地域が一致かつ蔵元名が空以外を抽出
          if (bre.areaId === prefectureId[index] && bre.name !== "") {
            arrayName.push(bre.name);
            arrayNameId.push(bre.id);
          }
          return 0;
        });
        // API実行結果をbreweriesに格納
        setBreweries(arrayName);
        setBreweriesId(arrayNameId);
      })
      .catch((error) => {
        alert("API実行時はCORS問題を解決すること。");
        console.log("失敗しました");
      });
  };
  // 銘柄一覧を取得
  const onClickBrandsGet = (bre, index, setBrandsShowFlag, setBrands) => {
    // 銘柄エリアの表示フラグをON
    setBrandsShowFlag(true);

    fetch("https://muro.sakenowa.com/sakenowa-data/api/brands", {
      mode: "cors"
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // ToDo API実行を1回だけにしたい。
        // 実行有無フラグをグローバルに持たせて、OBJはディープコピーすること。
        // 一度OBJをJSON形式に戻して再代入するとスムーズ。
        // 配列の中身をループで回して取得
        // 選択された産地の蔵元だけを抽出
        const arrayName = [];
        data.brands.map((bra) => {
          // 銘柄が一致かつ銘柄が空以外を抽出
          if (bra.breweryId === breweriesId[index] && bra.name !== "") {
            arrayName.push(bra.name);
          }
          return 0;
        });
        // API実行結果をbreweriesに格納
        setBrands(arrayName);
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
            <Header>さけのわでりあくと</Header>
          </Box>
        </Grid>
        {/* ステップバー */}
        <Grid item xs={12}>
          <Box
            component="span"
            m={1}
            style={{ display: stepBarShowFlag ? "" : "none" }}
          >
            <StepBar />
          </Box>
        </Grid>
        {/* ドロワーメニューとAPI実行 */}
        <Grid item xs={4}>
          <Box component="span" m={1}>
            <Menu
              setPrefecture={setPrefecture}
              setPrefectureId={setPrefectureId}
              setPrefectureSelectFlag={setPrefectureSelectFlag}
              setStepBarShowFlag={setStepBarShowFlag}
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
                    disabled={prefectureSelectFlag[index]}
                    style={{ width: 100 }}
                    onClick={() =>
                      onClickBreweriesGet(pre, index, setPrefectureSelectFlag)
                    }
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
                  <Button
                    key={bre}
                    variant="contained"
                    onClick={() =>
                      onClickBrandsGet(bre, index, setBrandsShowFlag, setBrands)
                    }
                  >
                    {bre}
                  </Button>
                );
              })}
            </div>
          </Box>
          <Box
            component="span"
            m={1}
            style={{ display: brandsShowFlag ? "" : "none" }}
          >
            <div>
              <h3>銘柄を指定する</h3>
              {brands.map((bra, index) => {
                return (
                  <Button key={bra} variant="contained">
                    {bra}
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
