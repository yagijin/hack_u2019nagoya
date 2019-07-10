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