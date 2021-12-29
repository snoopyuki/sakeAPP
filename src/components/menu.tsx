import React, { useState } from "react";
import { Button, Drawer } from "@material-ui/core";
import Box from "@mui/material/Box";

const onClickAlert = () => {
  alert("API実行時はCORS問題を解決すること。");
};
export default function Menu() {
  const [open, setopen] = useState(false);
  const toggleOpen = () => {
    setopen(!open);
  };

  return (
    <>
      <Button variant="outlined" onClick={toggleOpen}>
        open>>
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleOpen}>
        <h4>どろわーメニュー</h4>
        <Box m={1} mt={10}>
          <a
            href="https://muro.sakenowa.com/sakenowa-data/api/areas"
            target="_blank"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => onClickAlert()}
            >
              産地一覧取得WEB遷移
            </Button>
          </a>
          <br />
          <br />
          <Button variant="contained" color="primary">
            産地一覧取得API実行
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
