export default {
    namespaced: true,

    state: {
        balance: 0,
        bandwidth: 0,
        freeBandwidth: 0,
        frozen: 0,
        frozenExpires: 0,
        tokens: [],
        transfers: [],
        transactions:[]
    },

    mutations: {
        change(state, account) {
            state.balance = account.balance
            state.bandwidth = account.bandwidth
            state.freeBandwidth = account.freeBandwidth
            state.frozen = account.frozen
            state.frozenExpires = account.frozenExpires
        },

        frozen(state, frozen) {
            state.frozen = frozen
        },

        tokens(state, tokens) {
            state.tokens = tokens
        },

        transfers(state, transfers) {
            state.transfers = transfers
        },

        pushTransfers(state, transfers) {
            state.transfers.push(...transfers)
        },

        transactions(state, transactions) {
            state.transactions = transactions
        },

        pushTransactions(state, transactions) {
            state.transactions.push(...transactions)
        }
    }
}
