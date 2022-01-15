
import React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

type PropsType = {
  selectBrandFlavorTags: number[],
  flavorTags: { [key:string]: string | number }[],
}

// タグ表示コンポーネント
export const BrandDetailTags = (props: PropsType) => {
  const { selectBrandFlavorTags, flavorTags } = props;

  return (
    <>
      <br />
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
          if (tagObj != undefined)
            return <Chip key={index} label={tagObj.tag} color="primary" sx={{ margin: 0.5 }} />;
        })
      }
      </Box>
    </>
  );
};

export default BrandDetailTags;
