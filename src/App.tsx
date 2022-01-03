// @ts-nocheck
// buildとすために暫定対策

import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Menu } from "./components/menu";
import { Header } from "./components/header";
import { StepBar } from "./components/stepBar";
import { BrandDetail } from "./components/brandDetail";
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
  // 蔵元一覧のID。上記とまとめてOBJ化したい
  const [breweriesId, setBreweriesId] = useState(["0", "1"]);

  // 銘柄一覧
  const [brands, setBrands] = useState(["銘柄"]);
  // 銘柄一覧のID。上記とまとめてOBJ化したい
  const [brandsId, setBrandsId] = useState(["111"]);
  // 選択銘柄のデータ
  const [brandDetailRadar, setBrandDetailRadar] = useState([
    { flavor: "華やか", value: 1 },
    { flavor: "芳醇", value: 0.5 },
    { flavor: "濃厚", value: 1 },
    { flavor: "穏やか", value: 0.3 },
    { flavor: "ドライ", value: 1 },
    { flavor: "爽快", value: 0.8 }
  ]);

  // 表示フラグまとめたい
  // StepBarの表示フラグ
  const [stepBarShowFlag, setStepBarShowFlag] = useState(false);
  // 銘柄コンテンツエリアの制御フラグ
  const [brandsShowFlag, setBrandsShowFlag] = useState(false);
  // 銘柄詳細エリアの制御フラグ
  const [brandDetailShowFlag, setBrandDetailShowFlag] = useState(false);

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
        const arrayNameId = [];
        data.brands.map((bra) => {
          // 蔵元が一致かつ銘柄が空以外を抽出
          if (bra.breweryId === breweriesId[index] && bra.name !== "") {
            arrayName.push(bra.name);
            arrayNameId.push(bra.id);
          }
          return 0;
        });
        // API実行結果をbreweriesに格納
        setBrands(arrayName);
        setBrandsId(arrayNameId);
      })
      .catch((error) => {
        alert("API実行時はCORS問題を解決すること。");
        console.log("失敗しました");
      });
  };

  // 銘柄フレーバー取得
  const onClickflavorGet = (
    bra,
    index,
    setBrandDetailShowFlag,
    setBrandDetailRadar
  ) => {
    // 銘柄詳細エリアの表示フラグをON
    setBrandDetailShowFlag(true);
    // フレーバー情報をリセット
    setBrandDetailRadar([
      { flavor: "華やか", value: 0 },
      { flavor: "芳醇", value: 0 },
      { flavor: "濃厚", value: 0 },
      { flavor: "穏やか", value: 0 },
      { flavor: "ドライ", value: 0 },
      { flavor: "爽快", value: 0 }
    ]);

    fetch("https://muro.sakenowa.com/sakenowa-data/api/flavor-charts", {
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
        // 選択された銘柄のフレーバーだけを抽出
        data.flavorCharts.map((fla) => {
          // 銘柄が一致するものを抽出
          if (fla.brandId === brandsId[index]) {
            setBrandDetailRadar([
              // valueだけの代入に書き直したい
              { flavor: "華やか", value: fla.f1 },
              { flavor: "芳醇", value: fla.f2 },
              { flavor: "濃厚", value: fla.f3 },
              { flavor: "穏やか", value: fla.f4 },
              { flavor: "ドライ", value: fla.f5 },
              { flavor: "爽快", value: fla.f6 }
            ]);
            // 1回処理したらmapをBreakしたい
          }
          return 0;
        });
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
        {/* ステップバー */}
        <Grid item xs={8}>
          <Box
            component="span"
            m={1}
            style={{
              display: stepBarShowFlag ? "" : "none"
            }}
          >
            <StepBar />
          </Box>
          {/* コンテンツ配置 */}
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
                  <Button
                    key={bra}
                    variant="contained"
                    onClick={() =>
                      onClickflavorGet(
                        bra,
                        index,
                        setBrandDetailShowFlag,
                        setBrandDetailRadar
                      )
                    }
                  >
                    {bra}
                  </Button>
                );
              })}
            </div>
          </Box>
          <Box
            component="span"
            m={1}
            style={{ display: brandDetailShowFlag ? "" : "none" }}
          >
            <div>
              <h3>銘柄詳細</h3>
              <BrandDetail brandDetailRadar={brandDetailRadar}></BrandDetail>
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
