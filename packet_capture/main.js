let pcap = require('pcap')
let http = require('http')

//MACアドレスを他ファイルからimport
const MACADDR = require('./macAddr.js')
const PORT = 8080


let tcp_tracker = new pcap.TCPTracker()
//let pcap_session = pcap.createSession('wlan0', "arp")
let pcap_session = pcap.createSession('en0','arp')
let server = http.createServer()

// ここにターゲットにするデバイスのMACアドレス
let targetMacAddr = MACADDR.mac();

/**
 * 配列の内容が同一であるかの判定を行う
 * @param {[]int} arr 比較するMACアドレス
 */
function compareArray(arr) {
  for (var i = 0;i < targetMacAddr.length;i++) {
    if (targetMacAddr[i] != arr[i]) {
      return false
    }
  }
  return true
}

pcap_session.on('packet', function (raw_packet) {
  let packet = pcap.decode.packet(raw_packet);
  let sourceMacAddr = packet["payload"]["shost"]["addr"]

  // TargetのMACアドレスと一致した時
  if (compareArray(sourceMacAddr)) {
    console.log("これはお母さんです")
  }
})

console.log('HTTP Server Start')
console.log("Listen ",PORT)
server.on('request',setMacAddr)
server.listen(PORT)

// MacAddrの変更を行う
function setMacAddr(req,res) {
  
  // POST以外の場合　エラーメッセージを送信
  if(req.method != 'POST') {
    errRsp = JSON.stringify({
      "type" : "Method Error",
      "message" : "Only post request"
    })
    res.write(errRsp)
    res.end()
    return
  }

  // 監視対象のMACアドレスの変更
  req.on('data',(chunk) => {
    let reqData = JSON.parse(chunk)
    targetMacAddr = reqData['macAddr']
    let successRsp = JSON.stringify({
      "type" : "Success",
      "message" : "Target MACAddress Changed!"
    })
    res.write(successRsp)
    res.end()
  })
}
 
