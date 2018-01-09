'use strict'

const
  electron = require('electron'),
  path = require('path'),
  config = require('../config/electron'),
  app = electron.app,
  chokidar = require('chokidar'),
  fs = require('fs'),
  ipcMain = electron.ipcMain,
  BrowserWindow = electron.BrowserWindow

let mainWindow

ipcMain.on('init', function (event, arg) {
  readFiles('sharepoint/lists', files => {
    console.log(files)
    event.sender.send('sp-sites-update', files)
  })
  const watcher = chokidar.watch('sharepoint', {persistent: true})
  console.log(watcher)
  watcher.on('all', (e, path) => {
    readFiles('sharepoint/lists', files => {
      console.log(files)
      event.sender.send('sp-sites-update', files)
    })
  })
})

function readFiles (dirname, onFileContent, onError) {
  console.log(dirname)
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err)
      return
    }
    const files = []
    console.log(filenames)
    filenames.forEach(function (filename) {
      console.log(filename)
      const json = JSON.parse(fs.readFileSync('sharepoint/lists/' + filename, 'utf8'))
      files.push(json)
    })
    onFileContent(files)
  })
}

function createWindow () {
  mainWindow = new BrowserWindow({
    title: config.name,
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../icons/icon.png'),
    webPreferences: {webSecurity: false}
  })

  mainWindow.loadURL(
    process.env.NODE_ENV === 'production'
      ? `file://${__dirname}/index.html`
      : `http://localhost:${process.env.PORT || require('../../config').dev.port}`
  )
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Origin'] = ''
    callback({cancel: false, requestHeaders: details.requestHeaders})
  })
  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then(name => mainWindow.webContents.openDevTools())
      .catch(err => console.log('An error occurred: ', err))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
  console.log('activate')
})
