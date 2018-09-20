import http from './http'
import lists from './routes/lists'
import siteGroups from './routes/siteGroups'
import siteUsers from './routes/siteUsers'

export default {
  ...http,
  lists,
  siteGroups,
  siteUsers
}
