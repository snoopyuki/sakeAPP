// @ts-nocheck

import React, { useState } from "react";
import { Button, Drawer } from "@material-ui/core";
import Box from "@mui/material/Box";

const menuStyle = {
  background: "#AAA"
};

export const Menu = (props) => {
  const [open, setopen] = useState(false);
  const toggleOpen = () => {
    setopen(!open);
  };

  const onClickNextPage = () => {
    // 特に処理はない
  };
  const onClickDoAPI = () => {
    fetch("https://muro.sakenowa.com/sakenowa-data/api/areas", {
      mode: "cors"
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // API実行結果をpropsに格納
        console.log(data.areas[0].name);
        // ToDO配列の中身をループで回す。
        props.setPrefecture(data.areas[0].name);
      })
      .catch((error) => {
        alert("API実行時はCORS問題を解決すること。");
        console.log("失敗しました");
      });
  };

  return (
    <>
      <div>
        <h3>メニュー</h3>
        <Button variant="outlined" onClick={toggleOpen}>
          open＞＞
        </Button>
        <Drawer anchor="left" open={open} onClose={toggleOpen}>
          <h4>どろわーメニュー</h4>
          <Box m={1} mt={10} style={menuStyle}>
            <a
              href="https://muro.sakenowa.com/sakenowa-data/api/areas"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => onClickNextPage()}
              >
                産地一覧取得WEB遷移
              </Button>
            </a>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onClickDoAPI();
              }}
            >
              産地一覧取得API実行
            </Button>
          </Box>
        </Drawer>
      </div>
    </>
  );
};
