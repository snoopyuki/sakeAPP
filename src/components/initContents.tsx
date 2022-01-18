import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

// バックログの中身
const backLog: { [key: string]: string }[] = [
  {
    p: 'Issuesに移行完了',
    s: 'https://github.com/gityuuhub/sakeAPP/issues',
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
          <a href="https://github.com/gityuuhub/sakeAPP/issues" target="_blank" rel="noreferrer">
            {backLog.map((bl, index) => {
              return <ListItemText key={bl.p} primary={`${index}：${bl.p}`} secondary={bl.s} />;
            })}
          </a>
        </div>
      </ListItemButton>
    </>
  );
};
