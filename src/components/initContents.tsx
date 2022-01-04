import { ListItemButton, ListItemText } from "@mui/material";

//　バックログの中身
const backLog = [
  {
    p: "API実行をスマートにする",
    s: "ボタン押下時に1回実行済みなら結果を使いまわす。"
  },
  {
    p: "フレーバータグの導入",
    s: "銘柄詳細にフレーバータグを表示する。"
  },
  {
    p: "フレーバーチャート入力で好みの銘柄を検索",
    s: "6次元ベクトルでクラスタリングして近似値をとる銘柄を探す。"
  },
  {
    p: "CORS問題解消",
    s: "外部API実行はAPI Gateway⇒Lamdbaを活用する"
  },
  {
    p: "公開方式最適化",
    s: "S3直公開からRoute53／CloudFront利用に変更する"
  },
  {
    p: "デザインをまともに",
    s: "見た目に凝ったサイトにする。"
  },
  {
    p: "TypeScriptでBuildを通るように",
    s: "props型指定など適当なコードを直す。"
  },
  {
    p: "バックログのリストを見た目キレイに",
    s: "MUIのListItem系propsを活用する。"
  },
  {
    p: "ファビコン設定",
    s: "ドット絵を書いて組み込む。"
  },
  {
    p: "カラーテーマ作成",
    s: "MUIのテーマ機能を利用する。"
  },
  {
    p: "ランキング機能実装",
    s: "メニューのランキング押下時の機能を実装する。"
  },
  {
    p: "ヘッダーアイコンの活用",
    s: "ヘッダーアイコン押下時の処理を作る。開発者メニューの移行？"
  }
];

// 初期表示のコンテンツエリア
export const InitContents = () => {
  return (
    <>
      <h3>冬休みの自由開発</h3>
      <p>
        3日間でサーバレスSPAサイトとCI/CD環境を作ってみた。
        <br />
        コードは適当なので要リファクタリング。
      </p>
      <h4>バックログ</h4>
      <ListItemButton>
        <div>
          {backLog.map((bl) => {
            return <ListItemText kye={bl.p} primary={bl.p} secondary={bl.s} />;
          })}
        </div>
      </ListItemButton>
    </>
  );
};
