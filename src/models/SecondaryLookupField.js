import LookupField from './LookupField'
import { fieldType } from '../utils/enums'

export default class SecondaryLookupField extends LookupField {
  constructor (title, type, lookupField, lookupListId, primaryLookupFieldId) {
    super(title, type, lookupField, lookupListId)
    this.primaryLookupFieldId = primaryLookupFieldId
  }

  toJSON () {
    return {
      parameters: {
        DisplayName: this.title,
        FieldTypeKind: fieldType[this.type].key,
        LookupFieldName: this.lookupField,
        LookupListId: this.lookupListId,
        primaryLookupFieldId: this.primaryLookupFieldId
      }
    }
  }
}
