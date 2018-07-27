import { Client } from '@tronscan/client'
import store from '../popup/store'

export default function API() {
    const client = new Client()
    client.apiUrl = store.state.network.url

    return client
}
