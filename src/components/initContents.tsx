import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

// バックログの中身
const backLog: { [key: string]: string }[] = [
  {
    p: 'API実行をスマートにする',
    s: 'ボタン押下時に1回実行済みなら結果を使いまわす。',
  },
  {
    p: 'GitHubのSECRETを活用',
    s: '環境変数はenvに書き出してSECRET化',
  },
  {
    p: '公開方式最適化',
    s: 'Build時にCloudFrontのキャッシュをクリアする',
  },
  {
    p: 'デザインをまともに',
    s: '見た目に凝ったサイトにする。',
  },
  {
    p: 'Issuesの活用',
    s: 'バックログはGItHubのIssuesに移行する。',
  },
  {
    p: 'ファビコン設定',
    s: 'ドット絵を書いて組み込む。',
  },
  {
    p: 'カラーテーマ作成',
    s: 'MUIのテーマ機能を利用する。',
  },
];

// 初期表示のコンテンツエリア
export const InitContents: React.FC = () => {
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
          {backLog.map((bl, index) => {
            return <ListItemText key={bl.p} primary={`${index}：${bl.p}`} secondary={bl.s} />;
          })}
        </div>
      </ListItemButton>
    </>
  );
};
