// グローバルステート管理用プロバイダー
import { createContext, useState } from 'react';

export const MainContext = createContext({});

export const MainProvider = (props) => {
  const { children } = props;

  // スタブモードのフラグ管理
  const [stubMode, setStubMode] = useState(true);

  return <MainContext.Provider value={{ stubMode, setStubMode }}>{children}</MainContext.Provider>;
};
