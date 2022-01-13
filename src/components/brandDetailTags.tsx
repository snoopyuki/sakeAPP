// @ts-nocheck
// buildとすために暫定対策

import React, {useState} from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Box";
import Paper from "@mui/material/Paper";

// タグ表示コンポーネント
export const BrandDetailTags = (props) => {
  const {selectBrandId, selectBrandFlavorTags, flavorTags} = props;
  const [chipData, setChipData] = React.useState([
      { key: 0, label: 'Angular' },
      { key: 1, label: 'jQuery' },
      { key: 2, label: 'Polymer' },
      { key: 3, label: 'React' },
      { key: 4, label: 'Vue.js' },
    ]);
  return (
    <>
    <br/>
    <h3>特徴</h3>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: 0.5,
      }}
    >
    {
      selectBrandFlavorTags.map((brandTagId, index) => {
        const tagObj = flavorTags.find((flavorTag) => flavorTag.id === brandTagId);
        console.log("tagName:" + tagObj.tag);
        return(
          <Chip
            key={index}
            label={tagObj.tag}
            color="primary"
            sx={{margin: 0.5}}
          />
        )
      })
    }
    </Box>
    </>
  );
};

export default BrandDetailTags;
