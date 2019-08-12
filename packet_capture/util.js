module.exports = {
  sleep : async function(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
  },
  createMacAddrList: function createRandomMacAddrList() {
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
}
