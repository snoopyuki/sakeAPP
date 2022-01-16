import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Button from '@material-ui/core/Button';

import { getApiUrlFlavorCharts, getApiUrlBrands } from './getApiUrl';

const getBrandsDetailData = (stubMode: boolean) => {
  // APIの実行完了を待たせる
  return new Promise(function (resolve) {
    // 比較対象とする銘柄のフレーバー値を取得
    const BrandsDetailData: number[][] = [];
    fetch(getApiUrlFlavorCharts(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // 配列の中身をループで回して取得
        data.flavorCharts.map((fla: { [key: string]: number }) => {
          // 計算量が多そうなので適当に対象を絞る
          if (fla.brandId < 1000) {
            BrandsDetailData.push([fla.f1, fla.f2, fla.f3, fla.f4, fla.f5, fla.f6, fla.brandId]);
          }
        });
        // API実行後に返却
        resolve(BrandsDetailData);
        // console.log(BrandsDetailData);
      })
      .catch((error) => {
        console.log(error);
        // alert('API実行時はCORS問題を解決すること。');
        console.log('失敗しました');
      });
  });
};

const getBrandName = (stubMode: boolean, brandId: number) => {
  // APIの実行完了を待たせる
  return new Promise(function (resolve) {
    fetch(getApiUrlBrands(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.brands.map((bra: { [key: string]: any }) => {
          // 蔵元が一致かつ銘柄が空以外を抽出
          if (bra.id === brandId) {
            // API実行後にidと一致するnameを返却
            resolve(bra.name);
          }
          return 0;
        });
      })
      .catch((error) => {
        console.log(error);
        // alert('API実行時はCORS問題を解決すること。');
        console.log('失敗しました');
      });
  });
};

type PropsType = {
  setNowStep: (param: number) => void;
  stubMode: boolean;
};

export const SelectFlavor: React.FC<PropsType> = (props: PropsType) => {
  const { setNowStep, stubMode } = props;

  // 入力された好みのフレーバーデータ
  const [inputLikeFlavor, setInputLikeFlavor] = useState<{ [key: string]: number }>({});
  // 検索された銘柄のcos類似度
  const [cos, setCos] = useState<number>(-1); // 初期値はcos-180
  // 一番類似度が高い銘柄
  const [similarSake, setSimilarSake] = useState<string>('一番類似度が高い銘柄');

  const flavors = ['華やか', '芳醇', '濃厚', '穏やか', 'ドライ', '爽快'];

  useEffect(() => {
    setInputLikeFlavor({ f1: 0, f2: 0, f3: 0, f4: 0, f5: 0, f6: 0 });
  }, []);

  const onChangeFlavor1 = (event: any) => {
    inputLikeFlavor.f1 = event.target.value;
    setInputLikeFlavor(inputLikeFlavor);
  };
  const onChangeFlavor2 = (event: any) => {
    inputLikeFlavor.f2 = event.target.value;
    setInputLikeFlavor(inputLikeFlavor);
  };
  const onChangeFlavor3 = (event: any) => {
    inputLikeFlavor.f3 = event.target.value;
    setInputLikeFlavor(inputLikeFlavor);
  };
  const onChangeFlavor4 = (event: any) => {
    inputLikeFlavor.f4 = event.target.value;
    setInputLikeFlavor(inputLikeFlavor);
  };
  const onChangeFlavor5 = (event: any) => {
    inputLikeFlavor.f5 = event.target.value;
    setInputLikeFlavor(inputLikeFlavor);
  };
  const onChangeFlavor6 = (event: any) => {
    inputLikeFlavor.f6 = event.target.value;
    setInputLikeFlavor(inputLikeFlavor);
  };

  // 入力値と似た銘柄を検索
  async function onClickSearch() {
    // 入力値を変換して確認
    // スマートに書き直したい
    // 0~1のデータ範囲だとcos90-180度が出ないので-1~1の範囲に補正
    const comparisonData = [
      (inputLikeFlavor.f1 / 100 - 0.5) * 2,
      (inputLikeFlavor.f2 / 100 - 0.5) * 2,
      (inputLikeFlavor.f3 / 100 - 0.5) * 2,
      (inputLikeFlavor.f4 / 100 - 0.5) * 2,
      (inputLikeFlavor.f5 / 100 - 0.5) * 2,
      (inputLikeFlavor.f6 / 100 - 0.5) * 2,
    ];
    //    console.log(comparisonData);
    // テストコード：男山と比較して類似度を出してみる用
    // const otokoyamaData = [
    //   (0.2749325169644553 - 0.5) * 2,
    //   (0.4181043602797808 - 0.5) * 2,
    //   (0.2942875941983029 - 0.5) * 2,
    //   (0.4621684039563314 - 0.5) * 2,
    //   (0.5162428246010948 - 0.5) * 2,
    //   (0.4276556785124455 - 0.5) * 2,
    // ];

    // 比較対象の銘柄データを取得。
    // 計算量が多そうなので絞ってもいいかも。
    // 上手く型定義かけない。promiseだから？？
    //@ts-ignore
    const brandsDetailData: number[][] = await getBrandsDetailData(stubMode);
    // console.log(brandsDetailData);

    // brandsDetailData[i]に入っている銘柄毎にcos類似度を計算
    let bestCos = cos; //setCosの動作がタイムタグあるみたいので代替変数定義
    for (let i = 0; i < brandsDetailData.length; i++) {
      console.log(brandsDetailData[i]);
      // 変数準備
      let ab1 = 0;
      let ab2 = 0;
      let ab3 = 0;

      //事前計算
      for (let j = 0; j < comparisonData.length; j++) {
        ab1 += comparisonData[j] * (brandsDetailData[i][j] - 0.5) * 2;
        ab2 += comparisonData[j] * comparisonData[j];
        ab3 += (brandsDetailData[i][j] - 0.5) * 2 * (brandsDetailData[i][j] - 0.5) * 2;
      }

      //コサイン類似度のアルゴリズム
      // 1に近いほど類似度が高い
      // コサイン類似度はベクトルの角度で判断される（ベクトル量は考慮されないので注意）
      // ユークリッド距離を使って類似度を出した方がいいかも。
      const brandsCos = ab1 / (Math.sqrt(ab2) * Math.sqrt(ab3));
      console.log('ブランドID' + brandsDetailData[i][6] + 'のcos類似度は' + brandsCos);
      if (brandsCos > bestCos) {
        setCos(brandsCos); // cos類似度を更新
        bestCos = brandsCos; // cosのタイムラグ対策
        //@ts-ignore
        setSimilarSake(await getBrandName(stubMode, brandsDetailData[i][6])); // 銘柄名を更新
      }
    }
  }

  return (
    <>
      <Grid item xs={11}>
        <div>
          <h3>フレーバーから選ぶ</h3>
          華やか
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={onChangeFlavor1}
            value={inputLikeFlavor.f1}
          />
          芳醇
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={onChangeFlavor2}
            value={inputLikeFlavor.f2}
          />
          濃厚
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={onChangeFlavor3}
            value={inputLikeFlavor.f3}
          />
          穏やか
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={onChangeFlavor4}
            value={inputLikeFlavor.f4}
          />
          ドライ
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={onChangeFlavor5}
            value={inputLikeFlavor.f5}
          />
          爽快
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={onChangeFlavor6}
            value={inputLikeFlavor.f6}
          />
        </div>
        <Button variant="contained" onClick={() => onClickSearch()}>
          検索
        </Button>
        <p>
          入力値にcos類似度が最も近い銘柄は「{similarSake}：類似度{cos}」です。
        </p>
      </Grid>
    </>
  );
};
