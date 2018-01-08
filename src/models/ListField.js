import {fieldType} from 'utils/enums'

export default class ListField {
  constructor (title, type) {
    this.title = title
    this.type = type
    console.log(type)
  }

  toJSON () {
    console.log(fieldType[this.type])
    debugger
    return {
      Title: this.title,
      FieldTypeKind: fieldType[this.type].key
    }
  }
}
