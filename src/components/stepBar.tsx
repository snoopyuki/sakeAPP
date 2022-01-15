// @ts-nocheck
// buildとすために暫定対策

import { Stepper, Step, StepLabel } from '@mui/material';
import React from 'react';

type PropsType = {
  nowStep: boolean
}

export const StepBar = (props: PropsType) => {
  const {nowStep} = props
  const areaStepList: string = ['都道府県', '蔵元', '銘柄'];
  // ステップバーのアクティブステップも上位でユーズステートにすること

  return (
    <Stepper activeStep={nowStep} alternativeLabel>
      {areaStepList.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
