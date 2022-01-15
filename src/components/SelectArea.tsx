
import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { BrandDetail } from './brandDetail';
import {
  getApiUrlAreas,
  getApiUrlBrands,
  getApiUrlBreweries,
  getApiUrlFlavorCharts,
  getApiUrlFlavorTags,
  getApiUrlBrandFlavorTags,
} from './getApiUrl';

type PropsType = {
  setNowStep: (param: number) => void,
  stubMode: boolean,
}

export const SelectArea = (props: PropsType) => {
  const { setNowStep, stubMode } =
    props;

  // APIで取得してきた都道府県を挿入
  const [prefecture, setPrefecture] = useState<string[]>([]);
  // APIで取得した都道府県のID。上記とまとめてOBJ化したい。
  // 配列をpropsで渡しても元値を上書きできないのでuseState使う
  const [prefectureId, setPrefectureId] = useState<number[]>([]);

  // 都道府県の選択フラグ
  const [prefectureSelectFlag, setPrefectureSelectFlag] = useState<boolean[]>([]);

  // 蔵元一覧
  const [breweries, setBreweries] = useState<string[]>([]);
  // 蔵元一覧のID。上記とまとめてOBJ化したい
  const [breweriesId, setBreweriesId] = useState<number[]>([]);
  // 蔵元の選択フラグ
  const [breweriesSelectFlag, setBreweriesSelectFlag] = useState<boolean[]>([]);

  // 銘柄一覧
  const [brands, setBrands] = useState<string[]>([]);
  // 銘柄一覧のID。上記とまとめてOBJ化したい
  const [brandsId, setBrandsId] = useState<number[]>([]);
  // 銘柄の選択フラグ
  const [brandsSelectFlag, setbrandsSelectFlag] = useState<boolean[]>([]);
  // 選択銘柄のフレーバーデータ
  const [brandDetailRadar, setBrandDetailRadar] = useState<{[key:string]: string | number}[]>([]);
  // 選択した銘柄のbrandId
  const [selectBrandId, setSelectBrandId] = useState(0);
  // 選択した銘柄のフレーバータグ配列
  const [selectBrandFlavorTags, setSelectBrandFlavorTags] = useState<number[]>([]);
  // apiから取得したフレーバータグ一覧  {"id": number, "tag": string}
  const [flavorTags, setFlavorTags] = useState<{[key:string]: string | number}[]>([]);

  // 銘柄詳細エリアの制御フラグ
  const [brandDetailShowFlag, setBrandDetailShowFlag] = useState(false);
  // 蔵元エリアの表示フラグ
  const [breweriesShowFlag, setBreweriesShowFlag] = useState(false);
  // 銘柄エリアの制御フラグ
  const [brandsShowFlag, setBrandsShowFlag] = useState(false);

  useEffect(() => {
    // 都道府県一覧の取得
    fetch(getApiUrlAreas(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
        // APIレスポンスはresponse.areas[n]{id:1, name:北海道}
      })
      .then((data) => {
        // 配列の中身をループで回して取得
        const arrayPre: Array<string> = [];
        const arrayPreId: Array<number> = [];
        const arrayPrefectureSelectFlag: Array<boolean> = [];
        data.areas.map((areas: {[key: string]: any}) => {
          arrayPre.push(areas.name);
          arrayPreId.push(areas.id);
          arrayPrefectureSelectFlag.push(false);
          return 0;
        });
        // API実行結果をpropsに格納
        setPrefecture(arrayPre);
        setPrefectureId(arrayPreId);
        setPrefectureSelectFlag(arrayPrefectureSelectFlag);
        // console.log('都道府県一覧を取得');
        // console.log(arrayPre);
      })
      .catch((error) => {
        console.log(error);
        // alert(
        //   'API実行時はCORS問題を解決すること。 --disable-web-security --user-data-dir="ディレクトリ"',
        // );
        console.log('失敗しました');
      });

    // フレーバータグ一覧の取得
    // 初回レンダリングの際にapi呼び出ししてflavorTagsにセット
    fetch(getApiUrlFlavorTags(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log('flavor-tags(フレーバータグ一覧):');
        // console.log(data);
        // console.log('フレーバータグ一覧取り出す');
        // console.log(data.tags);
        setFlavorTags(data.tags);
      })
      .catch((error) => {
        console.log(error);
        alert('flavor-tagsでAPI実行時に失敗');
        console.log('失敗しました');
      });
  }, []);

  // 産地選択後に銘柄を取得する
  const onClickBreweriesGet = (index: number) => {
    // prefecture[index]（押下された産地）に対応するprefectureId（API戻り値のID）を取得する方法
    // console.log(prefectureId[index]);

    // ステップバーの表示を更新
    setNowStep(1);
    // コンテンツエリアの表示制御をリセット
    setBreweriesShowFlag(true);
    setBrandsShowFlag(false);
    setBrandDetailShowFlag(false);

    // 選択されたボタンを非活性にするようにフラグ更新
    const arrayFlag = prefectureSelectFlag;
    // 現在trueになっているフラグをリセットする
    arrayFlag.fill(false);
    arrayFlag[index] = true;
    setPrefectureSelectFlag(arrayFlag);

    // 蔵元一覧を取得
    fetch(getApiUrlBreweries(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
        // APIレスポンスはresponse.breweries[n]{id:1, name:蔵元, areaId:地域一覧のID}
      })
      .then((data) => {
        // ToDo API実行を1回だけにしたい。
        // 実行有無フラグをグローバルに持たせて、OBJはディープコピーすること。
        // 一度OBJをJSON形式に戻して再代入するとスムーズ。
        // 配列の中身をループで回して取得
        // 選択された産地の蔵元だけを抽出
        const arrayName: Array<string> = [];
        const arrayNameId: Array<number> = [];
        const arrayNameSelectFlag: Array<boolean> = [];
        data.breweries.map((bre: {[key:string]: any}) => {
          // 地域が一致かつ蔵元名が空以外を抽出
          if (bre.areaId === prefectureId[index] && bre.name !== '') {
            arrayName.push(bre.name);
            arrayNameId.push(bre.id);
            arrayNameSelectFlag.push(false);
          }
          return 0;
        });
        // API実行結果をbreweriesに格納
        setBreweries(arrayName);
        setBreweriesId(arrayNameId);
        setBreweriesSelectFlag(arrayNameSelectFlag);
      })
      .catch((error) => {
        console.log(error);
        // alert('API実行時はCORS問題を解決すること。');
        console.log('失敗しました');
      });
  };
  // 銘柄一覧を取得
  const onClickBrandsGet = (index: number) => {
    // ステップバーの表示を更新
    setNowStep(2);
    // コンテンツエリアの表示制御をリセット
    // 関数化したいな
    setBrandsShowFlag(true);
    setBrandDetailShowFlag(false);

    // 選択されたボタンを非活性にするようにフラグ更新
    const arrayFlag = breweriesSelectFlag;
    // 現在trueになっているフラグをリセットする
    arrayFlag.fill(false);
    arrayFlag[index] = true;
    setBreweriesSelectFlag(arrayFlag);

    fetch(getApiUrlBrands(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // ToDo API実行を1回だけにしたい。
        // 実行有無フラグをグローバルに持たせて、OBJはディープコピーすること。
        // 一度OBJをJSON形式に戻して再代入するとスムーズ。
        // 配列の中身をループで回して取得
        // 選択された産地の蔵元だけを抽出
        const arrayName: Array<string> = [];
        const arrayNameId: Array<number> = [];
        const arrayNameSelectFlag: Array<boolean> = [];
        data.brands.map((bra: {[key:string]: any}) => {
          // 蔵元が一致かつ銘柄が空以外を抽出
          if (bra.breweryId === breweriesId[index] && bra.name !== '') {
            arrayName.push(bra.name);
            arrayNameId.push(bra.id);
            arrayNameSelectFlag.push(false);
          }
          return 0;
        });
        // API実行結果をbreweriesに格納
        setBrands(arrayName); // 選択した蔵元の銘柄name配列
        // console.log(arrayName);
        setBrandsId(arrayNameId); // 選択した蔵元の銘柄id配列
        // console.log(arrayNameId);
        setbrandsSelectFlag(arrayNameSelectFlag);
      })
      .catch((error) => {
        console.log(error);
        // alert('API実行時はCORS問題を解決すること。');
        console.log('失敗しました');
      });
  };

  // 銘柄フレーバー取得
  const onClickflavorGet = (index: number) => {
    // ステップバーの表示を更新
    setNowStep(3);
    // コンテンツエリアの表示制御をリセット
    setBrandDetailShowFlag(true);

    // 選択されたボタンを非活性にするようにフラグ更新
    const arrayFlag = brandsSelectFlag;
    // 現在trueになっているフラグをリセットする
    arrayFlag.fill(false);
    arrayFlag[index] = true;
    setbrandsSelectFlag(arrayFlag);

    // フレーバー情報をリセット
    setBrandDetailRadar([
      { flavor: '華やか', value: 0 },
      { flavor: '芳醇', value: 0 },
      { flavor: '濃厚', value: 0 },
      { flavor: '穏やか', value: 0 },
      { flavor: 'ドライ', value: 0 },
      { flavor: '爽快', value: 0 },
    ]);

    fetch(getApiUrlFlavorCharts(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // ToDo API実行を1回だけにしたい。
        // 実行有無フラグをグローバルに持たせて、OBJはディープコピーすること。
        // 一度OBJをJSON形式に戻して再代入するとスムーズ。

        console.log('選択した銘柄id' + brandsId[index]);
        // 選択した銘柄のidを状態として持つように変更
        setSelectBrandId(brandsId[index]);
        console.log('選択した銘柄idをセットした' + selectBrandId);

        // 配列の中身をループで回して取得
        // 選択された銘柄のフレーバーだけを抽出
        data.flavorCharts.map((fla: {[key:string]: any}) => {
          // 銘柄が一致するものを抽出
          if (fla.brandId === brandsId[index]) {
            setBrandDetailRadar([
              // valueだけの代入に書き直したい
              { flavor: '華やか', value: fla.f1 },
              { flavor: '芳醇', value: fla.f2 },
              { flavor: '濃厚', value: fla.f3 },
              { flavor: '穏やか', value: fla.f4 },
              { flavor: 'ドライ', value: fla.f5 },
              { flavor: '爽快', value: fla.f6 },
            ]);
            // 1回処理したらmapをBreakしたい
          }
          // return 0;
        });
      })
      .catch((error) => {
        console.log(error);
        // alert('API実行時はCORS問題を解決すること。');
        console.log('失敗しました');
      });

    if (brandsId[index] != selectBrandId) {
      // 銘柄フレーバータグ一覧の取得
      fetch(getApiUrlBrandFlavorTags(stubMode), { mode: 'cors' })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log('brand-flavor-tags(銘柄フレーバータグ一覧):');
          // console.log(data);
          // タグのリストをリセット
          setSelectBrandFlavorTags([]);

          data.flavorTags.forEach((fla: {[key:string]: any}) => {
            // 銘柄が一致するものを抽出
            if (fla.brandId === brandsId[index]) {
              setSelectBrandFlavorTags(fla.tagIds);
              console.log('selectBrandFlavorTags' + selectBrandFlavorTags);
              // 1回処理したらmapをBreakしたい
            }
          });
        })
        .catch((error) => {
          console.log(error);
          alert('brand-flavor-tagsでerror');
          console.log('失敗しました');
        });
    }
  };
  return (
    <>
      <Grid item xs={8}>
        {/* コンテンツ配置 */}
        <Box component="span" m={1}>
          <div>
            <h3>都道府県から探す</h3>
            {prefecture.map((pre, index) => {
              return (
                <Button
                  key={index} // key変更
                  variant="contained"
                  disabled={prefectureSelectFlag[index]}
                  style={{ width: 100 }}
                  onClick={() => onClickBreweriesGet(index)}
                >
                  {pre}
                </Button>
              );
            })}
          </div>
        </Box>
        <Box component="span" m={1} style={{ display: breweriesShowFlag ? '' : 'none' }}>
          <div>
            <h3>蔵元を指定する</h3>
            {breweries.map((bre, index) => {
              return (
                <Button
                  key={index} // key変更
                  variant="contained"
                  disabled={breweriesSelectFlag[index]}
                  onClick={() => onClickBrandsGet(index)}
                >
                  {bre}
                </Button>
              );
            })}
          </div>
        </Box>
        <Box component="span" m={1} style={{ display: brandsShowFlag ? '' : 'none' }}>
          <div>
            <h3>銘柄を指定する</h3>
            {brands.map((bra, index) => {
              return (
                <Button
                  key={index} // key変更
                  variant="contained"
                  disabled={brandsSelectFlag[index]}
                  onClick={() =>
                    onClickflavorGet(index)
                  }
                >
                  {bra}
                </Button>
              );
            })}
          </div>
        </Box>
        <Box component="span" m={1} style={{ display: brandDetailShowFlag ? '' : 'none' }}>
          <div>
            <h3>銘柄詳細</h3>
            <BrandDetail
              brandDetailRadar={brandDetailRadar}
              selectBrandFlavorTags={selectBrandFlavorTags}
              flavorTags={flavorTags}
            ></BrandDetail>
          </div>
        </Box>
      </Grid>
    </>
  );
};
