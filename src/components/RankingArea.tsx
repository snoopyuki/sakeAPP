import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@material-ui/data-grid';

import { getApiUrlRankings, getApiUrlBrands } from './getApiUrl';

type PropsType = {
  stubMode: boolean;
};

export const RankingArea = (props: PropsType) => {
  const { stubMode } = props;

  // ランキング一覧
  const [rankings, setRankings] = useState<{ [key: string]: number }[]>([]);

  // 銘柄一覧
  const [brands, setBrands] = useState<string[]>([]);
  // 銘柄一覧のID。上記とまとめてOBJ化したい
  const [brandsId, setBrandsId] = useState<number[]>([]);

  useEffect(() => {
    // 銘柄一覧の取得
    fetch(getApiUrlBrands(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const arrayName: Array<string> = [];
        const arrayNameId: Array<number> = [];
        data.brands.map((bra: { [key: string]: any }) => {
          // 銘柄が空以外を抽出
          if (bra.name !== '') {
            arrayName.push(bra.name);
            arrayNameId.push(bra.id);
          }
          return 0;
        });
        // API実行結果をbrandsに格納
        setBrands(arrayName); // 選択した銘柄のname配列
        // console.log(arrayName);
        setBrandsId(arrayNameId); // 選択した銘柄のid配列
      })
      .catch((error) => {
        console.log(error);
        // alert('API実行時はCORS問題を解決すること。');
        console.log('失敗しました');
      });
  }, []);

  // TODO 無駄に一回実行されているので修正したい
  useEffect(() => {
    // ランキング一覧の取得
    fetch(getApiUrlRankings(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
        // APIレスポンスはresponse.overall[n]{"rank": number, "score": number, "brandId": number}
      })
      .then((data) => {
        // DataGridを使うためにユニークID付与
        data.overall.map((item: { [key: string]: any }, index: number) => {
          item.id = index;
          // 小数点第3位を四捨五入
          item.score = Math.round(item.score * 100) / 100;

          const brand = brandsId.findIndex((b) => b === item.brandId);

          if (brand) {
            item.name = brands[brand];
          }
        });
        setRankings(data.overall);
        console.log(data.overall);
      })
      .catch((error) => {
        console.log(error);
        // alert(
        //   'ranking取得API失敗',
        // );
        console.log('失敗しました');
      });
  }, [brandsId]);

  // ランキング表のカラム
  const columns = [
    { field: 'rank', headerName: 'ランク', width: 150 },
    { field: 'score', headerName: 'スコア', width: 150 },
    { field: 'name', headerName: '銘柄名', width: 200 },
  ];

  return (
    <>
      <Grid item xs={11}>
        <div>
          <h3>ランキング</h3>
          <div style={{ height: 925, width: '100%' }}>
            <DataGrid rows={rankings} columns={columns} pageSize={15} />
          </div>
        </div>
      </Grid>
    </>
  );
};
