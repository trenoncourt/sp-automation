import { fieldType } from '../utils/enums'

function getItemTypeForListName (name) {
  return 'SP.Data.' + name.charAt(0).toUpperCase() + name.split(' ').join('').slice(1) + 'ListItem'
}

export default class RandomItem {
  constructor (listName) {
    this.listName = listName
  }

  setField (fields) {
    this.fields = fields
  }

  setFieldGroups (fieldGroups) {
    this.fieldGroups = fieldGroups
  }

  toJSON () {
    let item = {}
    for (let f of this.fields) {
      if (f.Hidden || f.ReadOnlyField || f.FromBaseType) {
        continue
      }
      switch (f.FieldTypeKind) {
        case fieldType.integer.key:
          item[f.EntityPropertyName] = Math.floor(Math.random() * 10) + 1
          break
        case fieldType.text.key:
          const letters = 'abcde fghij klmno pqrst uvwxyz'
          let text = ''
          for (var i = 0; i < 5; i++) {
            text += letters.charAt(Math.floor(Math.random() * letters.length))
          }
          item[f.EntityPropertyName] = text
          break
        case fieldType.dateTime.key:
          const year = new Date().getFullYear()
          item[f.EntityPropertyName] = new Date(new Date() + Math.random() * (new Date(year, 0, 1) - new Date())).toJSON()
          break
        case fieldType.boolean.key:
          item[f.EntityPropertyName] = Math.random() >= 0.5
          break
        case fieldType.number.key:
          item[f.EntityPropertyName] = (Math.random() * 10 + 1)
          break
        case fieldType.lookup.key:
          break
        case fieldType.user.key:
          const fieldGroup = this.fieldGroups.find(fg => fg.title.toLowerCase() === f.EntityPropertyName.toLowerCase())
          if (!fieldGroup || !fieldGroup.users.length) {
            return
          }
          const user = fieldGroup.users[Math.floor(Math.random() * fieldGroup.users.length)]
          item[`${f.EntityPropertyName}Id`] = user.Id
          break
      }
    }
    item.__metadata = {type: getItemTypeForListName(this.listName)}
    return item
  }
}
