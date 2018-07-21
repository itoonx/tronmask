export default {
    namespaced: true,

    state: {
        balance: 0,
        bandwidth: 0,
        freeBandwidth: 0,
        frozen: 0,
        frozenExpires: 0
    },

    mutations: {
        change(state, account) {
            state.balance = account.balance
            state.bandwidth = account.bandwidth
            state.freeBandwidth = account.freeBandwidth
            state.frozen = account.frozen
            state.frozenExpires = account.frozenExpires
        }
    }
}
