import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';

import { getApiUrlRankings, getApiUrlBrands } from './getApiUrl';

type PropsType = {
  setNowStep: (param: number)=> void;
  stubMode: boolean;
};

export const SelectFlavor: React.FC<PropsType> = (props: PropsType) => {
  const { setNowStep, stubMode } = props;

  // 入力された好みのフレーバーデータ
  const [inputLikeFlavor, setInputLikeFlavor] = useState<{[key: string]: number}>({});

  const flavors = ['華やか','芳醇','濃厚','穏やか','ドライ','爽快'];

  useEffect(()=>{
    setInputLikeFlavor({ 'f1': 0, 'f2': 0, 'f3': 0, 'f4': 0, 'f5': 0, 'f6': 0});
  },[])

  const onChangeFlavor1 = (value: any) => {
    inputLikeFlavor.f1 = value;
    setInputLikeFlavor(inputLikeFlavor);
  }
  const onChangeFlavor2 = (value: any) => {
    inputLikeFlavor.f2 = value;
    setInputLikeFlavor(inputLikeFlavor);
  }
  const onChangeFlavor3 = (value: any) => {
    inputLikeFlavor.f3 = value;
    setInputLikeFlavor(inputLikeFlavor);
  }
  const onChangeFlavor4 = (value: any) => {
    inputLikeFlavor.f4 = value;
    setInputLikeFlavor(inputLikeFlavor);
  }
  const onChangeFlavor5 = (value: any) => {
    inputLikeFlavor.f5 = value;
    setInputLikeFlavor(inputLikeFlavor);
  }
  const onChangeFlavor6 = (value: any) => {
    inputLikeFlavor.f6 = value;
    setInputLikeFlavor(inputLikeFlavor);
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
      </Grid>
    </>
  );
};
