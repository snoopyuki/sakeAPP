const urlList = {
  // 通常モードの時に呼び出すURL
  normal: {
    areas: 'https://0yxmp6pif1.execute-api.ap-northeast-1.amazonaws.com/sakenowaAPI/areas',
    brands: 'https://0yxmp6pif1.execute-api.ap-northeast-1.amazonaws.com/sakenowaAPI/brands',
    breweries: 'https://0yxmp6pif1.execute-api.ap-northeast-1.amazonaws.com/sakenowaAPI/breweries',
    rankings: 'https://0yxmp6pif1.execute-api.ap-northeast-1.amazonaws.com/sakenowaAPI/rankings',
    flavorCharts:
      'https://0yxmp6pif1.execute-api.ap-northeast-1.amazonaws.com/sakenowaAPI/flavor-charts',
    flavorTags:
      'https://0yxmp6pif1.execute-api.ap-northeast-1.amazonaws.com/sakenowaAPI/flavor-tags',
    brandFlavorTags:
      'https://0yxmp6pif1.execute-api.ap-northeast-1.amazonaws.com/sakenowaAPI/brand-flavor-tags',
  },
  // スタブモードの時に呼び出すURL
  stub: {
    areas: 'https://4deralr2qh.execute-api.ap-northeast-1.amazonaws.com/sakeAPI/areas',
    brands: 'https://4deralr2qh.execute-api.ap-northeast-1.amazonaws.com/sakeAPI/brands',
    breweries: 'https://4deralr2qh.execute-api.ap-northeast-1.amazonaws.com/sakeAPI/breweries',
    rankings: 'https://4deralr2qh.execute-api.ap-northeast-1.amazonaws.com/sakeAPI/rankings',
    flavorCharts:
      'https://4deralr2qh.execute-api.ap-northeast-1.amazonaws.com/sakeAPI/flavorcharts',
    flavorTags: 'https://4deralr2qh.execute-api.ap-northeast-1.amazonaws.com/sakeAPI/flavortags',
    brandFlavorTags:
      'https://4deralr2qh.execute-api.ap-northeast-1.amazonaws.com/sakeAPI/brandflavortags',
  },
  // 直接実行（API実行するとCORS問題発生）
  sakenowa: {
    areas: 'https://muro.sakenowa.com/sakenowa-data/api/areas',
    brands: 'https://muro.sakenowa.com/sakenowa-data/api/brands',
    breweries: 'https://muro.sakenowa.com/sakenowa-data/api/breweries',
    flavorCharts: 'https://muro.sakenowa.com/sakenowa-data/api/flavor-charts',
  },
};

// 地域一覧のAPI実行先をスタブモードに応じて返却
export const getApiUrlAreas = (stubModeFlag: boolean): string => {
  // スタブモードのURL
  if (stubModeFlag) return urlList.stub.areas;
  // CORS問題を解決するだけのURL（GW経由でHeader付与）
  else return urlList.normal.areas;
};
// 銘柄一覧一覧のAPI実行先をスタブモードに応じて返却
export const getApiUrlBrands = (stubModeFlag: boolean): string => {
  // スタブモードのURL
  if (stubModeFlag) return urlList.stub.brands;
  // CORS問題を解決するだけのURL（GW経由でHeader付与）
  else return urlList.normal.brands;
};
// 蔵元一覧のAPI実行先をスタブモードに応じて返却
export const getApiUrlBreweries = (stubModeFlag: boolean): string => {
  // スタブモードのURL
  if (stubModeFlag) return urlList.stub.breweries;
  // CORS問題を解決するだけのURL（GW経由でHeader付与）
  else return urlList.normal.breweries;
};
// フレーバーチャート一覧のAPI実行先をスタブモードに応じて返却
export const getApiUrlFlavorCharts = (stubModeFlag: boolean): string => {
  // スタブモードのURL
  if (stubModeFlag) return urlList.stub.flavorCharts;
  // CORS問題を解決するだけのURL（GW経由でHeader付与）
  else return urlList.normal.flavorCharts;
};
// フレーバータグ一覧のAPI実行先をスタブモードに応じて返却
export const getApiUrlFlavorTags = (stubModeFlag: boolean): string => {
  // スタブモードのURL
  if (stubModeFlag) return urlList.stub.flavorTags;
  // CORS問題を解決するだけのURL（GW経由でHeader付与）
  else return urlList.normal.flavorTags;
};
// 銘柄毎のフレーバータグ一覧取得API実行先をスタブモードに応じて返却
export const getApiUrlBrandFlavorTags = (stubModeFlag: boolean): string => {
  // スタブモードのURL
  if (stubModeFlag) return urlList.stub.brandFlavorTags;
  // CORS問題を解決するだけのURL（GW経由でHeader付与）
  else return urlList.normal.brandFlavorTags;
};
// ランキング一覧取得API実行先をスタブモードに応じて返却
export const getApiUrlRankings = (stubModeFlag: boolean): string => {
  // スタブモードのURL
  if (stubModeFlag) return urlList.stub.rankings;
  // CORS問題を解決するだけのURL（GW経由でHeader付与）
  else return urlList.normal.rankings;
};

export const getApiUrlSakenowaAreas = (): string => {
  return urlList.sakenowa.areas;
};
export const getApiUrlSakenowaBrands = (): string => {
  return urlList.sakenowa.brands;
};
export const getApiUrlSakenowaBreweries = (): string => {
  return urlList.sakenowa.breweries;
};
export const getApiUrlSakenowaFlavorCharts = (): string => {
  return urlList.sakenowa.flavorCharts;
};
