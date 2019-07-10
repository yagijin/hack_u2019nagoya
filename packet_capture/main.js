let pcap = require('pcap')

//MACアドレスを他ファイルからimport
const macAddr = require('./macAddr.js')

let tcp_tracker = new pcap.TCPTracker()
let pcap_session = pcap.createSession('wlan0', "arp")

// ここにターゲットにするデバイスのMACアドレス
const TARGET = macAddr.mac();

/**
 * 配列の内容が同一であるかの判定を行う
 * @param {[]int} arr 比較するMACアドレス
 */
function compareArray(arr) {
  for (var i = 0;i < TARGET.length;i++) {
    if (TARGET[i] != arr[i]) {
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

 
