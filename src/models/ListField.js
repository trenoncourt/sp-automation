import { fieldType } from 'utils/enums'

export default class ListField {
  constructor (title, type) {
    this.title = title
    this.type = type
    console.log(type)
  }

  toJSON () {
    return {
      Title: this.title,
      FieldTypeKind: fieldType[this.type].key
    }
  }
}
