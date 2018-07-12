export default {
    namespaced: true,

    state: {
        name: 'Tronscan Testnet',
        url: 'https://testapi.tronscan.org'
    },

    mutations: {
        change(state, network) {
            state.name = network.name
            state.url = network.url
        }
    }
}
