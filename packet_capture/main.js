let pcap = require('pcap')
let tcp_tracker = new pcap.TCPTracker()

let pcap_session = pcap.createSession('en0', "arp");

// ここにターゲットにするデバイスのMACアドレス
// const TARGET = 

function compareArray(arr) {
  let flag = true
  for (var i = 0;i < TARGET.length;i++) {
    if (TARGET[i] != arr[i]) {
      flag = false
    }
  }

  return flag
}

pcap_session.on('packet', function (raw_packet) {
  let packet = pcap.decode.packet(raw_packet);
  console.log(packet["payload"]["shost"])
  let macAddr = packet["payload"]["shost"]["addr"]

  if (compareArray(macAddr)) {
    console.log("これは完全にやぎじん")
  }
});

 
