FORMAT: 1A
HOST: http://localhost/api

# Catan API
- Catanゲームをサーバー/クライアント型アプリケーションで行うためのAPI
- For API Blueprint See: https://qiita.com/oskamathis/items/c374138635eb0012b119

## Dice [POST /dice]
ダイスを回す。`LocalGame.dice()`

+ Request (application/json)
    + Attributes

+ Response 200 (application/json)
    + Attributes
        + isSuccess: `True` (bool) - リクエストが受付けられたかどうか
        + dice: `1` (number) - Diceの目. 1-6
+ Response 

## Action [POST /action]
アクションフェーズで実行する操作(`Road/Settlement/City/DevelopmentCard/Change`)をおこなう。`LocalGame.action()`

+ Request (appliaction/json)
  + Attributes
    + user: `1` (number) - ユーザー番号. 0-based
    + actionType: `Road` (string) - アクションの種類。`Road/Settlement/City/DevelopmentCard/Change`から選択。 TODO: 安全な書き方がある？
    + consume: (array) - 消費する資源
      + `1` (number) - Lumber(Wood)
      + `1` (number) - Brick
      + `0` (number) - Grain
      + `0` (number) - Wool
      + `0` (number) - Ore
    + 