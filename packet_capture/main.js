let pcap = require('pcap')
let http = require('http')

//MACアドレスを他ファイルからimport
const MACADDR = require('./macAddr.js')


let tcp_tracker = new pcap.TCPTracker()
let pcap_session = pcap.createSession('wlan0', "arp")

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

server.on('request',setMacAddr)
server.listen(8080)

// MacAddrの変更を行う
function setMacAddr(req,res) {
  
  if(req.method != 'POST') {
    res.end()
    return
  }

  req.on('data',(chunk) => {
    let reqData = JSON.parse(chunk)
    targetMacAddr = reqData['macAddr']
    res.end()
  })
}
 
