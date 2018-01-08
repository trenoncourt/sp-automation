export const fieldType = {
  invalid: {
    key: 0,
    label: 'invalid'
  },
  integer: {
    key: 1,
    label: 'integer'
  },
  text: {
    key: 2,
    label: 'text'
  },
  note: {
    key: 3,
    label: 'note'
  },
  dateTime: {
    key: 4,
    label: 'dateTime'
  },
  counter: {
    key: 5,
    label: 'counter'
  },
  choice: {
    key: 6,
    label: 'choice'
  },
  lookup: {
    key: 7,
    label: 'lookup'
  },
  boolean: {
    key: 8,
    label: 'boolean'
  },
  number: {
    key: 9,
    label: 'number'
  },
  currency: {
    key: 10,
    label: 'currency'
  },
  url: {
    key: 11,
    label: 'url'
  },
  computed: {
    key: 12,
    label: 'computed'
  },
  threading: {
    key: 13,
    label: 'threading'
  },
  guid: {
    key: 14,
    label: 'guid'
  },
  multiChoice: {
    key: 15,
    label: 'multiChoice'
  },
  gridChoice: {
    key: 16,
    label: 'gridChoice'
  },
  calculated: {
    key: 17,
    label: 'calculated'
  },
  file: {
    key: 18,
    label: 'file'
  },
  attachments: {
    key: 19,
    label: 'attachments'
  },
  user: {
    key: 20,
    label: 'user'
  },
  recurrence: {
    key: 21,
    label: 'recurrence'
  },
  crossProjectLink: {
    key: 22,
    label: 'crossProjectLink'
  },
  modStat: {
    key: 23,
    label: 'modStat'
  },
  error: {
    key: 24,
    label: 'error'
  },
  contentTypeId: {
    key: 25,
    label: 'contentTypeId'
  },
  pageSeparator: {
    key: 26,
    label: 'pageSeparator'
  },
  threadIndex: {
    key: 27,
    label: 'threadIndex'
  },
  workflowStatus: {
    key: 28,
    label: 'workflowStatus'
  },
  allDayEvent: {
    key: 29,
    label: 'allDayEvent'
  },
  workflowEventType: {
    key: 30,
    label: 'workflowEventType'
  },
  geolocation: {
    key: 98,
    label: 'geolocation'
  },
  outcomeChoice: {
    key: 99,
    label: 'outcomeChoice'
  },
  maxItems: {
    key: 31,
    label: 'maxItems'
  },
  get () {
    return Object.values(this).filter(o => o.key)
  },
  find (key) {
    return Object.values(this).find(o => o.key === key)
  }
}
