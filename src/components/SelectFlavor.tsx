import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Button from '@material-ui/core/Button';

import { getApiUrlRankings, getApiUrlBrands } from './getApiUrl';

type PropsType = {
  setNowStep: (param: number) => void;
  stubMode: boolean;
};

export const SelectFlavor: React.FC<PropsType> = (props: PropsType) => {
  const { setNowStep, stubMode } = props;

  // 入力された好みのフレーバーデータ
  const [inputLikeFlavor, setInputLikeFlavor] = useState<{ [key: string]: number }>({});
  // 検索された銘柄のcos類似度
  const [cos, setCos] = useState<number>(0.001); // 初期値適当
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
  const onClickSearch = () => {
    // 入力値を変換して確認
    // スマートに書き直したい
    const comparisonData = [
      inputLikeFlavor.f1 / 100,
      inputLikeFlavor.f2 / 100,
      inputLikeFlavor.f3 / 100,
      inputLikeFlavor.f4 / 100,
      inputLikeFlavor.f5 / 100,
      inputLikeFlavor.f6 / 100,
    ];
    console.log(comparisonData);

    // テストコード：男山と比較して類似度を出してみる
    const otokoyamaData = [
      0.2749325169644553,
      0.4181043602797808,
      0.2942875941983029,
      0.4621684039563314,
      0.5162428246010948,
      0.42765567851244557,
    ];
    // 変数準備
    let ab1 = 0;
    let ab2 = 0;
    let ab3 = 0;
    //事前計算
    for (let i = 0; i < comparisonData.length; i++) {
      ab1 += comparisonData[i] * otokoyamaData[i];
      ab2 += comparisonData[i] * comparisonData[i];
      ab3 += otokoyamaData[i] * otokoyamaData[i];
    }
    //コサイン類似度のアルゴリズム
    // 1に近いほど類似度が高い
    // コサイン類似度はベクトルの角度で判断される（ベクトル量は考慮されないので注意）
    setCos(ab1 / (Math.sqrt(ab2) * Math.sqrt(ab3)));
  };

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
