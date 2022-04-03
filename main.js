const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 1024,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    //   contextIsolation: false,
    },
  })

  win.webContents.openDevTools()

  //   win.loadURL('https://panel.adex.al')

  //   const contents = win.webContents;
  //   win.setTitle('Adex Panel - Production')
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  // for mac os
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  try {
    require('electron-reloader')(module)
  } catch (_) {}
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
