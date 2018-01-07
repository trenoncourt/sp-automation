export default class List {
  constructor (title, description) {
    this.title = title
    this.description = description
    this.__metadata = { type: 'SP.List' }
    this.baseTemplate = 100
    this.contentTypesEnabled = true
  }

  toJSON () {
    return {
      Title: this.title,
      Description: this.description,
      __metadata: this.__metadata,
      BaseTemplate: this.baseTemplate,
      ContentTypesEnabled: this.contentTypesEnabled
    }
  }
}
