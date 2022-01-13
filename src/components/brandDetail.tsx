// @ts-nocheck
// buildとすために暫定対策

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip
} from "recharts";
import BrandDetailTags from "./brandDetailTags"

export const BrandDetail = (props) => {
  return (
    <>
      <RadarChart // レーダーチャートのサイズや位置、データを指定
        height={300} //レーダーチャートの全体の高さを指定
        width={300} //レーダーチャートの全体の幅を指定
        cx="50%" //要素の左を基準に全体の50%移動
        cy="50%" //要素の上を基準に全体の50%移動
        data={props.brandDetailRadar} //ここにArray型のデータを指定
      >
        {/*  レーダーのグリッド線を表示 */}
        <PolarGrid />
        <PolarAngleAxis
          dataKey="flavor" //Array型のデータの、数値を表示したい値のキーを指定
        />
        <Radar //レーダーの色や各パラメーターのタイトルを指定
          name="Mike" //hoverした時に表示される名前を指定
          dataKey="value" //Array型のデータのパラメータータイトルを指定
          stroke="#8884d8" //レーダーの線の色を指定
          fill="#8884d8" //レーダーの中身の色を指定
          fillOpacity={0.6} //レーダーの中身の色の薄さを指定
        />
        {/* hoverすると各パラメーターの値が表示される */}
        <Tooltip />
      </RadarChart>
      <BrandDetailTags
        selectBrandId={props.selectBrandId}
        selectBrandFlavorTags={props.selectBrandFlavorTags}
        flavorTags={props.flavorTags}
      />
    </>
  );
};
