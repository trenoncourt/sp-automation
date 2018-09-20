import { fieldType } from '../utils/enums'

export default class Field {
  constructor (title, type) {
    this.title = title
    this.type = type
  }

  toJSON () {
    return {
      __metadata: {type: 'SP.Field'},
      Title: this.title,
      FieldTypeKind: fieldType[this.type].key
    }
  }
}
