'use strict'

const
  electron = require('electron'),
  path = require('path'),
  config = require('../config/electron'),
  app = electron.app,
  fs = require('fs'),
  ipcMain = electron.ipcMain,
  settings = require('electron-settings'),
  BrowserWindow = electron.BrowserWindow,
  spFiles = require('./spFiles')

let mainWindow

ipcMain.on('init', function (event, arg) {
  readFiles('sharepoint/lists', event)
    .then(files => {
      event.sender.send('sp-sites-update', files)
    })
})

ipcMain.on('downloadJson', function (event, arg) {
  spFiles.saveSpJsonFile(arg.title, arg.items)
})

function promiseAllP (items, block) {
  var promises = []
  items.forEach(function (item, index) {
    promises.push(function (item, i) {
      return new Promise(function (resolve, reject) {
        return block.apply(this, [item, index, resolve, reject])
      })
    }(item, index))
  })
  return Promise.all(promises)
} // promiseAll

function readFiles (dirname, event) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, function (err, filenames) {
      if (err) return reject(err)
      promiseAllP(filenames,
        (filename, index, resolve, reject) => {
          fs.readFile(path.resolve(dirname, filename), 'utf-8', function (err, content) {
            if (err) return reject(err)
            return resolve(JSON.parse(content))
          })
        })
        .then(results => {
          return resolve(results)
        })
        .catch(error => {
          return reject(error)
        })
    })
  })
}

// function readFiles (dirname, onFileContent, onError) {
//   readDirFiles.read(dirname, function (err, files) {
//     if (err) return console.dir(err)
//
//     files.forEach(function (file) {
//       const json = JSON.parse(file)
//       files.push(json)
//     })
//     console.dir(files)
//     onFileContent(files)
//   })
//   // console.log(dirname)
//   // fs.readdir(dirname, function (err, filenames) {
//   //   if (err) {
//   //     onError(err)
//   //     return
//   //   }
//   //   const files = []
//   //   console.log(filenames)
//   //   filenames.forEach(function (filename) {
//   //     console.log(filename)
//   //     const json = JSON.parse(fs.readFileSync('sharepoint/lists/' + filename, 'utf8'))
//   //     files.push(json)
//   //   })
//   //   onFileContent(files)
//   // })
// }

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

app.on('login', (event, webContents, request, authInfo, callback) => {
  console.log(authInfo, request, event, webContents)
  const environment = settings.get('environment')
  if (!environment.useCurrentUser) {
    event.preventDefault()
    callback(environment.username, environment.password)
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
  console.log('activate')
})
