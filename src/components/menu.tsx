// @ts-nocheck

import React, { useState } from "react";
import { Button, Drawer } from "@material-ui/core";
import Box from "@mui/material/Box";
import { ariaHidden } from "@mui/material";

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
        // ToDO配列の中身をループで回して取得
        let arrayPre = [];
        data.areas.map((areas) => {
          arrayPre.push(areas.name);
          return 0;
        });
        // API実行結果をpropsに格納
        props.setPrefecture(arrayPre);
        // 中身の確認
        // data.areas.forEach((elm) => {
        //       Object.keys(elm).forEach((key) => {
        // console.log(`key: ${key} value: ${elm[key]}`);
        //         });
        // });
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
