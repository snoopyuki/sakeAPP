// @ts-nocheck
// buildとすために暫定対策

import React, {useState} from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Box";

// タグ表示コンポーネント
export const BrandDetailTags = (props) => {
  const {selectBrandId, selectBrandFlavorTags, flavorTags} = props;

  return (
    <>
    <br/>
    <h3>特徴</h3>
    <Stack direction="row" spacing={1}>
      {
          selectBrandFlavorTags.map((brandTagId, index) => {
              console.log("selectBrandFlavorTagsから取り出した" + brandTagId);
              const tagObj = flavorTags.find((flavorTag) => flavorTag.id === brandTagId);
              console.log("tagName:" + tagObj.tag);
              return(
                  <Chip key={index} label={tagObj.tag} color="primary" />
              )
          })
      }
    </Stack>
    </>
  );
};

export default BrandDetailTags;
