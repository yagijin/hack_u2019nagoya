## 設定ファイルの作り方
`macAddr.js`を以下のように設定する．(ファイルがない場合は作る)

```js
function mac () {
    // ここに監視対象とする端末のMacアドレス
    return [xx,xx,xx,xx,xx,xx]
}

module.exports = {
    'mac': mac
} 
```

## ターゲットにするMACアドレスの変更方法
ターゲットにするMACアドレスの変更は，HTTP APIサーバを通じて行う．

`main.js`を実行することでAPIサーバが起動し，`/set_mac_address`の`8080`に以下のJSONでPOSTリクエストを送ることで変更することができる．

```js
{
  'macAddr'[xx,xx,xx,xx,xx,xx]
}
```
