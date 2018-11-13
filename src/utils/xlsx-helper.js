import XLSX from 'xlsx'
import {saveAs} from 'file-saver'

export default {
  s2ab (s) {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  },
  exportXLSX (colNames, data, colInfos) {
    data.unshift(colNames)

    let ws = XLSX.utils.aoa_to_sheet(data)
    let wb = XLSX.utils.book_new()

    if (colInfos) {
      ws['!cols'] = colInfos
    }

    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
    let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })

    var blob = new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' })

    saveAs(blob, 'export.xlsx')
  }
}
