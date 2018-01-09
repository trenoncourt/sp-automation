import { fieldType } from 'utils/enums'

export default class ListField {
  constructor (title, type) {
    this.title = title
    this.type = type
  }

  toJSON () {
    return {
      Title: this.title,
      FieldTypeKind: fieldType[this.type].key
    }
  }
}
