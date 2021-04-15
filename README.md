# 概要
- サーバー側の機能は何か？
  - 最小構成とするなら、履歴を溜めていくだけで良い。状態遷移は個々のアプリケーションが実行する。

# 作業ログ

## 2021.04.14 redux 写経
- https://github.com/reduxjs/redux/tree/master/examples/counter を試す。
- storeを作る。純関数
- アロー関数ではstore.dispatch()を呼ぶようにして、type:'INCREMENT'などを指定。これはpartialっぽい使い方。
  - 引数 type: 'INCREMENT'を渡す関数、みたいになる。
- https://qiita.com/ryosuketter/items/9588493b633069e06777
  - export / importについて
  - export defaultすると受け側は{}付けなくて良い。1ファイル1コンポーネントの時使える。
- https://qiita.com/G-awa/items/57cf0fee2352386a9b85
  - テスト戦略。t_wada
- 質とスピード:https://speakerdeck.com/twada/quality-and-speed-2020-autumn-edition
  - 質とスピードはトレードオフではない
  - 思考プロセス(↓)と実証プロセス(↑)
    - Idea
    - Learn
    - Data
    - Measure
    - Product
    - Build
  - スピードは何とトレードオフか？
    - ExploitとExploreの関係？新技術や多様性
    - 教育。次世代
- 技術選定の審美眼: https://speakerdeck.com/twada/worse-is-better-understanding-the-spiral-of-technologies-2019-edition
  - これが本当に良い資料
  - 残っているものに学ぶ: Unix, Rest, RDBMS
  - 螺旋のような変化のもたらしたもの1: クラウド, docker
  - 2: モバイル, 可処分時間の奪い合い
    - 
  - Worse is betterの真意
    - 構成をシンプルに保って、参加のハードルを下げ、たくさんの人に伝染するものが生き残る
  - StatefulなRESTについての疑問
    - https://stackoverflow.com/questions/20031728/can-we-make-restful-webservice-stateful
    - scaleを気にする場合にstatelessにする。
- 次に、todos-with-undo を写経
  - https://github.com/reduxjs/redux/tree/master/examples/todos-with-undo
  - reducerの組み合わせ
  - Add
  - Undo/Redo
  - Completed/TODO
  - ReduxのProviderとは
## 2021.04.13
- Local Game Clientの構成検討
  - ひとまず、send_action()を1本通した。
  - actionはどうやって区別する？
    - A) 1つの関数の第一引数
      - コードが短くて済む？可読性下がる？引数を全て共通化できる？
      - 例えば、他人の操作が必要になるUser Changeとか、Use Cardとか
    - B) 異なる関数
- Redux勉強
  - 今回で言うと、local_clientの内部挙動とrenderを分ける、とか。
  - あと、localgameclientserverが処理した結果を受け取って、内部状態を変更するとか
  - 
- 別ファイル書き出し

# 検討
## UI
- [ ] Clickをどう処理するのか？
  - [ ] CatanGameにClickの全関数配置する
    - [ ] 内部的にはLocalGameClientの関数呼び出す。
    - [ ] API化できるようdictなりjsonなりで書く。
    - [ ] stringに直して渡す？
    - [ ] あとでHTTPGameClientに切り替える
      - [ ] これを想定しても、clientのI/Fは文字列でなくて良い。
  - [ ] ClickはAction(Dice/Build/Buy Cardなど)とSelection(Build Roadならroadタイルと資源(資源は自明だから選択制にしない？))
    - [ ] ユーザーの行動はAction -> Selectionの順番？それともSelection->Actionの順番？
      - [ ] 前者の方が絞り込みできて嬉しい。
      - [ ] Selectionした後のConfirmボタンが必要そう
        - [ ] これは選択しているActionボタンの表示を変えて受け付ける、など。
  - [x] onClickは末端でclickの挙動を司っているだけで、途中のpropsとしての受け渡しは任意の名前で良さそう。handleClickActionButtonとかで関数の呼び分けが可能
    - [ ] State管理が必要。特に、最初の配置決め1->2->3->4->4->3->2->1の順番に家と道を決めるところ。
      - [ ] 受入可能なアクションのルールをdictで記述する？{user: x}ならユーザーxに限る
        - [ ] {action: [x, y, z]}ならactionがx, y, zに限る。
    - [ ] Stateの種類は？
      - [ ]  Initial - order ... 初期フェーズ。order: 0 ~ #user*2-1
      - [ ]  GameTime - user
        - [ ]  WaitingForDice
        - [ ]  WaitingForActions
          - [ ]  細かいことを言うと、Developmentカードのうちいくつかは複数アクションに分かれる。
        - [ ]  WaitingForChangeResponse
- [ ]  LocalGameClientの実装。State管理、Actionの受付、レスポンス取得

## History
- [ ] Historyの内訳は？
  - [ ] まずActionは、Develop, Buy, Diceあたりの1回ボタン押して資源など選んでconfirmした時にサーバーで走る処理の直後の状態
  - [ ] ボード状況(Road, Point, Terrain)とPlayer情報(資源, Card, Longest, Largest), Action Results(Diceなら目、(その結果資源が配られているはず))
    - [ ] ちなみにBurstはこれも1つのアクションとする？複数人Burstした場合、複数のresponseを待つ
    - [ ] この時はResponseにRequestの同一性を検査できる情報が必要？
      - [ ] シーケンス図でかけるのでそのうち整理する。サーバー側とクライアント側両方でチェック走らせる必要。サーバーは棄却するしクライアントは検知する。
  - [ ] サーバーは、これらを操作した盤面をレスポンスとして返すのがわかりやすい？

## Local Client
- Reduxを使う？https://qiita.com/soarflat/items/bd319695d156654bbe86
- counter example: https://github.com/reduxjs/redux/blob/master/docs/introduction/Examples.md
## HTTP
- [fetchの使い方](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
    - requestとresponseのjsonを定義する。1関数に1URLを対応させる？
### APIs
Action: `road, settlement, city, development card, change`をどういうAPIで作るか？前4つは消費のみ。changeは取得もあり。



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
