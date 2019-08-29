# Hack U 2019 Nagoya HappyHacking賞受賞  

# タイトル：GameAnHour（ゲームは1時間）  
任意の相手がWifiにつないだ時に，それを検知して通知してくれるサービス．  
具体例：お母さんにゲームは1時間って言われているけど，お母さんがでかけている間はやりたいなぁ...  
 →　お母さんがお家に帰ってきた時（お家のWifiにつないだ時に）通知してくれます．

![diagram](https://user-images.githubusercontent.com/29916489/62693490-95ad1400-ba0d-11e9-98e8-378923c4a63d.png)

### デモ動画 
 [![デモ動画](http://img.youtube.com/vi/exCaS31xPbU/0.jpg)](http://www.youtube.com/watch?v=exCaS31xPbU)

### 概要
Wifi接続時にブロードキャストされるARPからMACアドレスを特定．  
MACアドレスがターゲットのものと一致したら設定したGoogleHomeなどの設定したデバイスに通知を送信．  
通知が届くのでターゲット（お母さん）が帰宅したことがわかり，ゲームをやめてずっと勉強していたフリができます．

### メリット  
特殊なデバイスをターゲットに持たせる必要は無く，現代社会で誰もが持っているスマホを使える．  
相手のデバイスを直接操作することはなくこちら側のデバイスのみで完結している．  
ルータなどを設定しているわけではないので，簡単に別のネットワークに移せる．  

# 各プログラム

## Server  
Wifi接続時にブロードキャストされるARPからMACアドレスを特定．  
MACアドレスがターゲットのものと一致したら設定した各種デバイスに通知を送信．  

## GoogleHome
ユーザに通知．   

## スマートフォンアプリ  
ユーザに通知．  
ターゲットの切り替え．  
各種設定  

### アプリの使い方
#### MACアドレスを手動入力する場合
サーバとGoogleHomeのIPアドレスを指定します．  
その後，ターゲットの帰宅を通知したいデバイスを選択．  
ターゲットのMACアドレスを入力して `SET TARGET TO NOTIFY` ボタンを押して設定完了．  
#### MACアドレスを選択する場合
サーバとGoogleHomeのIPアドレスを指定します．  
ターゲットの帰宅を通知したいデバイスを選択．  
その後`REFRESH`ボタンを押すとローカルネットワーク上のMACアドレス一覧が表示されます．ベンダーの情報もわかるためここからターゲットのMACアドレスの部分を押すとて設定完了．  
<table>
<tr>
<td><img src="https://user-images.githubusercontent.com/29916489/63913619-b7794400-ca6b-11e9-9a7e-f04b858333b9.png"></td>
<td><img src="https://user-images.githubusercontent.com/29916489/63913617-b7794400-ca6b-11e9-90ea-b276d2c6439d.png"></td>
</tr>
</table>
