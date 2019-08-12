let pcap = require('pcap')
let express = require('express')

//MACアドレスを他ファイルからimport
const MACADDR = require('./macAddr.js')


const PORT = 8080
const NET_INTERFACE = 'en0'

// Packet Caputure
let tcp_tracker = new pcap.TCPTracker()
let pcap_session = pcap.createSession(NET_INTERFACE, "arp")

// HTTP Server
let app = express()
app.listen(PORT)

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

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

/**
 * ランダムにMACアドレスのリストを返す関数
 */
function createRandomMacAddrList() {
  let macAddrs = []
  for (let i = 0;i < 10;i++) {
    let tmp = ''
    for (let j = 0;j < 5;j++) {
      tmp += Math.floor(Math.random() * 99) + ':'
    }
    tmp += Math.floor(Math.random() * 99) 
    macAddrs.push(tmp)
  }
  return macAddrs
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms))

}

pcap_session.on('packet', function (raw_packet) {
  let packet = pcap.decode.packet(raw_packet);
  let sourceMacAddr = packet["payload"]["shost"]["addr"]

  // TargetのMACアドレスと一致した時
  if (compareArray(sourceMacAddr)) {
    console.log("これはお母さんです")
  }
})

app.post('/set_mac_address',function(req,res) {
  let reqMacAddr = req.body.macAddr

  if (reqMacAddr === undefined) {
    res.json({
      'type':'Failed',
      'message':"Unexcepted Error"
    })
  } else {
    console.log('Target MAC address is Changed!')
    console.log(targetMacAddr," -> ",reqMacAddr)
    targetMacAddr = reqMacAddr
    res.json({
      'type':'Success',
      'message': 'Target MACAddress is Changed!'
    })
  }
})

app.get('/get_mac_list',function(req,res){
  (async () => {
    await sleep(1000)
    res.json({
      'macAddrs':createRandomMacAddrList()
    })
  })()
})
