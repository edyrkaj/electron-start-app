const { contextBridge, ipcRenderer } = require('electron')
const { networkInterfaces, platform, version, userInfo } = require('os')

const getIps = () => {
  const nets = networkInterfaces()
  const results = Object.create(null) // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = []
        }
        results[name].push(net.address)
      }
    }
  }

  return results
}

contextBridge.exposeInMainWorld('electronAPI', {
  getIpAddresses: (addresses) => {
    return getIps();
  },
  getMainData: (data) => {
    return {
        platform:  platform(),
        version: version(),
        userInfo: userInfo(),
        electron: process.versions.electron };
  },
})
