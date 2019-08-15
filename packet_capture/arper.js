function Macvendor(_macadd, _vendor) { //MACアドレスとベンダー名を保存するためのコンストラクタ
  this.macadd = _macadd;
  this.vendor = _vendor;
}

function calcMacAddrs (){
  return new Promise((resolve,reject) => {
    var exec = require('child_process').exec; //Node jsでコマンドを実行するために必要
    var COMMAND = 'sudo arp-scan -l'; //実行するコマンド(あらかじめ「sudo install arp-scan」でarp-scanをインストールする必要がある)
    var result = []; //コマンド実行結果の切り出し時に使用
    var hoge = []; //resultで切り出した行を更に細分化する際に使用
    var addven = []; //MACアドレスとベンダー名を格納するために使用
    
    exec(COMMAND, function (error, stdout, stderr) {
    
      //Error表示
      if (error !== null) {
        console.log('Error: arper.js');
        return;
      }
    
      /*  'sudo arp-scan -l'の実行結果を見たい場合
       console.log('stdout: ', stdout);
      */
    
      result = stdout.split("\n"); //出力結果から該当する行のみ切り出す
    
      for (var i = 2; i < result.length - 4; i++) { //最初の2行目と最後の4行目以外を使用
        hoge = result[i].split("\t"); //IPアドレス,MACアドレス,ベンダー名を分別
        addven[i - 2] = new Macvendor(hoge[1], hoge[2]); //hoge[1]がMACアドレス,hoge[2]がベンダー名
      }
    
      /*  addvenのMACアドレスとベンダー名が見たい場合
     for(var j = 0; j < addven.length; j++){
         console.log(addven[j].macadd, ":", addven[j].vendor);
     }
     */
      resolve(addven);
    }
    );
  })
}


module.exports = {
  calcMacAddrs: calcMacAddrs
};