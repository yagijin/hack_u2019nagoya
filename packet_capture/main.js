const pcap = require('pcap')
const express = require('express')

const util = require('./util.js')
const arper = require('./arper.js')

//MACアドレスを他ファイルからimport
const MACADDR = require('./macAddr.js')

const PORT = 8080
const NET_INTERFACE = 'en0'

// ここにターゲットにするデバイスのMACアドレス
let targetMacAddr = MACADDR.mac();

let deviceToken = 'Default'
let startFlag = false
let notifyType = 'Default'

// Packet Caputure
let pcapSession = pcap.createSession(NET_INTERFACE, "arp")

// HTTP Server
let app = express()


app.listen(PORT)
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())


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

pcapSession.on('packet', function (raw_packet) {
  let packet = pcap.decode.packet(raw_packet);
  let sourceMacAddr = packet["payload"]["shost"]["addr"]

  // TargetのMACアドレスと一致した時
  if (startFlag && compareArray(sourceMacAddr)) {
    if (notifyType == 'android' || notifyType == 'both' ) {
      util.notify(deviceToken,'Your mother is approaching!')
    }
    if (notifyType == 'ghome' || notifyType == 'both' ) {
      // ここにGoogle Homeの通知処理
    } 
    startFlag = false
  }
})

// MACアドレスの一覧を取得
app.get('/get_mac_list',function(req,res){
  (async () => {
    let resultMacAddrs = await arper.calcMacAddrs()

    res.json({
      'macAddrs': resultMacAddrs
    })
  })()
})

// 監視の開始
app.post('/monitor', function(req,res){
  console.log(req.body)
  if(req.body.token === undefined || req.body.macAddr === undefined || req.body.notifyType === undefined ) {
    res.json({
      'message':'Format error'
    })
    res.end()
    return
  }

  let token = req.body.token
  let macAddr = util.hex2dex(req.body.macAddr)
  let type = req.body.notifyType

  console.log('Target MAC address is Changed!')
  console.log(targetMacAddr," -> ",macAddr)
  console.log('Device Token is Changed!')
  console.log(deviceToken,' -> ',token)
  console.log('Notify Type is Changed!')
  console.log(notifyType,' -> ',type)
  console.log()

  deviceToken = token
  targetMacAddr = macAddr
  notifyType = type

  startFlag = true

  res.end()
})

