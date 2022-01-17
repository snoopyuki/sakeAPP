# sakeAPP

## Playing Agggrement

- 飽きたら止める。
  - 無理に続けない。続ける義務無し。
  - 実装指示はしない。好きなように思うがままに遊ぶ。
- 誰かが壊しても責めない。
  - どうにもならなければ前の ver.に戻せば OK
- 分からないことはまず自分で調べる。
  - 何か聞きたい場合は、休憩時間か時間外に。
  - 土日休日のプライベート時間は連絡に応える義務なし。

## ブランチ戦略

- GitHub Flow を利用。
  - master にの変更を検知すると pipline 稼働。
  - feature に更新は集める
    - Fork して feature に pull request
    - 直接 Push でも OK
  - feature は定期的（頻度適当）に master に marge する。
