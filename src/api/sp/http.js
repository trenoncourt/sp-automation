import axios from 'axios'
import interceptors from './interceptors'

const http = axios.create({withCredentials: true})

interceptors(http)
export default http
