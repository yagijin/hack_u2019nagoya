let { Expo } = require('expo-server-sdk')
let expo = new Expo()

module.exports = {
  sleep : async function(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
  },
  createMacAddrList: function createRandomMacAddrList() {
    let macAddrs = ['58:cb:52:7b:d7:d9']
      for (let i = 0;i < 10;i++) {
      let tmp = ''
      for (let j = 0;j < 5;j++) {
        tmp += Math.floor(Math.random() * 99) + ':'
      }
      tmp += Math.floor(Math.random() * 99) 
      macAddrs.push(tmp)
    }
    return macAddrs
  },
  notify : async function(token) {
    let message = [{
      to:token,
      sound:'default',
      body:'Mother is coming!',
      channelId:'closing-message',
    }]
    
    let chunk = expo.chunkPushNotifications(message)
    let ticket = await expo.sendPushNotificationsAsync(chunk[0])

    console.log('Notify Result :')
    console.log(ticket)
    console.log()
  },
  hex2dex:function(str) {
    return str.split(':').map((x) => {
      return parseInt('0x' + x,16)
    })
  }
}
