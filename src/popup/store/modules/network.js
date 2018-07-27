export default {
    namespaced: true,

    state: {
        id: 2,
        name: 'Tronscan Testnet',
        url: 'https://testapi.tronscan.org',
        type: 'testnet'
    },

    mutations: {
        change(state, network) {
            state.id = network.id
            state.name = network.name
            state.url = network.url
            state.type = network.type
        }
    }
}
