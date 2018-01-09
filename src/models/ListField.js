import {fieldType} from 'utils/enums'

export default class ListField {
  constructor (title, type, lookupField, lookupListId) {
    this.title = title
    this.type = type
    this.lookupField = lookupField
    this.lookupListId = lookupListId
  }

  toJSON () {
    return {
      Title: this.title,
      FieldTypeKind: fieldType[this.type].key,
      LookupField: this.lookupField,
      LookupListId: this.lookupListId
    }
  }
}
