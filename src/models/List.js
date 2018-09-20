import { fieldType } from '../utils/enums'
import PrimaryLookupField from './PrimaryLookupField'
import Field from './Field'

export default class List {
  constructor (title, description) {
    this.title = title
    this.description = description
    this.baseTemplate = 100
    this.contentTypesEnabled = true
  }

  addFiedls (id, fields) {
    this.fields = fields.map(f => {
      if (fieldType[f.type].key === fieldType.lookup.key) {
        return new PrimaryLookupField(f.title, f.title, f.lookupField, id)
      } else {
        return new Field(f.title, f.title)
      }
    })
  }

  toJSON () {
    return {
      __metadata: {type: 'SP.List'},
      Title: this.title,
      Description: this.description,
      BaseTemplate: this.baseTemplate,
      ContentTypesEnabled: this.contentTypesEnabled
    }
  }
}
