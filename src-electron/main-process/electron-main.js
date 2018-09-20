import { app, BrowserWindow } from 'electron'

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

const
  electron = require('electron'),
  path = require('path'),
  fs = require('fs'),
  ipcMain = electron.ipcMain,
  settings = require('electron-settings'),
  spFiles = require('./spFiles')

let mainWindow

ipcMain.on('readJsonFiles', function (event, arg) {
  const environment = settings.get('environment')
  readFiles(environment.path, event)
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

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {webSecurity: false}
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Origin'] = ''
    callback({cancel: false, requestHeaders: details.requestHeaders})
  })

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
})
