import Field from './Field'

export default class LookupField extends Field {
  constructor (title, type, lookupField, lookupListId) {
    super(title, type)
    this.lookupField = lookupField
    this.lookupListId = lookupListId
  }
}
