export const fieldType = {
  integer: {
    key: 1,
    label: 'integer'
  },
  text: {
    key: 2,
    label: 'text'
  },
  get () {
    return Object.values(this).filter(o => o.key)
  },
  find (key) {
    return Object.values(this).find(o => o.key === key)
  }
}
