const fs = require('fs')
const settings = require('electron-settings')

module.exports = {
  saveSpJsonFile (listTitle, items) {
    const environment = settings.get('environment')
    fs.writeFile(environment.path + '/' + listTitle + '.json', JSON.stringify({ title: listTitle, fields: items }, null, 2), err => console.log(err))
  }
}
