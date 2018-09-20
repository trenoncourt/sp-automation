import LookupField from './LookupField'
import { fieldType } from '../utils/enums'

export default class PrimaryLookupField extends LookupField {
  toJSON () {
    return {
      parameters: {
        __metadata: {type: 'SP.FieldCreationInformation'},
        Title: this.title,
        FieldTypeKind: fieldType[this.type].key,
        LookupFieldName: this.lookupField,
        LookupListId: this.lookupListId
      }
    }
  }
}
