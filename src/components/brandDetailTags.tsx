// @ts-nocheck
// buildとすために暫定対策

import React, {useState} from "react";

// タグ表示コンポーネント
export const BrandDetailTags = (props) => {
  const {selectBrandId, selectBrandFlavorTags, flavorTags} = props;

  return (
    <>
    選択した銘柄のidは、
    {selectBrandId}
    <br/>
      特徴<br/>
      {
          selectBrandFlavorTags.map((brandTagId, index) => {
              console.log("selectBrandFlavorTagsから取り出した" + brandTagId);
              const tagObj = flavorTags.find((flavorTag) => flavorTag.id === brandTagId);
              console.log("tagName:" + tagObj.tag);
              return(
                  <p>{tagObj.tag}</p>
              )
          })
      }
    </>
  );
};

export default BrandDetailTags;
