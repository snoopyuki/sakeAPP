import { Stepper, Step, StepLabel } from "@mui/material";
import { useState } from "react";

export const StepBar = (props) => {
  // ステップバーの説明書き
  const [steps, setSteps] = useState(["都道府県", "蔵元", "銘柄"]);
  // ステップバーのアクティブステップも上位でユーズステートにすること

  return (
    <Stepper activeStep={props.nowStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
