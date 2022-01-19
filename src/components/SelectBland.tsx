import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

type PropsType = {
  setNowStep: (param: number) => void;
  stubMode: boolean;
};

export const SelectBland: React.FC<PropsType> = (props: PropsType) => {
  const { setNowStep, stubMode } = props;
  const onClickSearchBland = () => {
    alert("検索結果を出す予定");
  };

  return (
    <>
      <Grid item xs={11}>
        <div>
          <h3>銘柄名から探す</h3>
          <TextField />
          <Button
            variant="contained"
            color="primary"
            onClick={onClickSearchBland}
          >
            検索
          </Button>
        </div>
      </Grid>
    </>
  );
};
