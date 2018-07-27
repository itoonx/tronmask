export default {
    namespaced: true,

    state: {
        id: 1,
        name: 'Mainnet',
        url: 'https://api.tronscan.org',
        type: 'mainnet'
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
