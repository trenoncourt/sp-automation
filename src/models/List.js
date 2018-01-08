export default class List {
  constructor (title, description, fields) {
    this.title = title
    this.description = description
    this.baseTemplate = 100
    this.contentTypesEnabled = true
    this.fields = fields
  }

  toJSON () {
    return {
      Title: this.title,
      Description: this.description,
      BaseTemplate: this.baseTemplate,
      ContentTypesEnabled: this.contentTypesEnabled
    }
  }
}
