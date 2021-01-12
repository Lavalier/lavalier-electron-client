const path = require('path')

const { app, BrowserWindow, screen } = require('electron')
const isDevEnvironment = require('electron-is-dev')

let installExtension, REACT_DEVELOPER_TOOLS

if (isDevEnvironment) {
  const devTools = require('electron-devtools-installer')
  installExtension = devTools.default
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
// if (require("electron-squirrel-startup")) {
//   app.quit();
// }

function createWindow() {
  // Fetch dimensions for the browser window
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  // Creates the browser window
  const win = new BrowserWindow({
    width: width * 0.8,
    height: height * 0.8,
    minWidth: 1280,
    minHeight: 720,
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: '#000000',
    title: 'Lavalier'
  })

  // Removes the ugly Windows toolbar at the top of the window :)
  win.removeMenu()

  // Loads the index.html of the app
  win.loadURL(isDevEnvironment ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  if (isDevEnvironment) {
    win.webContents.openDevTools({ mode: 'detach' })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (isDevEnvironment) {
    installExtension(REACT_DEVELOPER_TOOLS)
  }

  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
