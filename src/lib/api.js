import { Client } from '@tronscan/client'
import store from '../popup/store'

const API = new Client()
API.apiUrl = store.state.network.url

export default API
