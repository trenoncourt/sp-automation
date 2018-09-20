import { fieldType } from 'utils/enums'
import Field from './Field'

export default class ListField extends Field {
  constructor (title, type, lookupField, lookupListId, fields) {
    super(title, type)
    this.lookupField = lookupField
    this.lookupListId = lookupListId
    this.fields = fields.map(f => new Field(f.title, f.type))
  }

  toJSON () {
    if (fieldType[this.type].key === fieldType.lookup.key) {
      return {
        parameters: {
          Title: this.title,
          FieldTypeKind: fieldType[this.type].key,
          LookupFieldName: this.lookupField,
          LookupListId: this.lookupListId
        }
      }
    } else {
      return {
        Title: this.title,
        FieldTypeKind: fieldType[this.type].key
      }
    }
  }
}
