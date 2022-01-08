const urlList = {
  // 通常モードの時に呼び出すURL
  normal: {
    areas: "TBD",
    brands: "TBD",
    breweries: "TBD",
    rankings: "TBD",
    flavorCharts: "TBD",
    flavorTags: "TBD",
    brandFlavorTags: "TBD"
  },
  // スタブモードの時に呼び出すURL
  stub: {
    areas:
      "https://4deralr2qh.execute-api.ap-northeast-1.amazonaws.com/sakeAPI/areas",
    brands: "TBD",
    breweries: "TBD",
    rankings: "TBD",
    flavorCharts: "TBD",
    flavorTags: "TBD",
    brandFlavorTags: "TBD"
  }
};

// 地域一覧のAPI実行先をスタブモードに応じて返却
export const getApiUrlAreas = (stubModeFlag: Boolean): String => {
  // スタブモードのURL
  if (stubModeFlag) return urlList.stub.areas;
  // CORS問題を解決するだけのURL（GW経由でHeader付与）
  else return urlList.normal.areas;
};
