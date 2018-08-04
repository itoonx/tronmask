export default {
    namespaced: true,

    state: {
        votes: {},
        candidates: []
    },

    mutations: {
        votes(state, votes) {
            state.votes = votes
        },

        candidates(state, candidates) {
            state.candidates = candidates
        },
    }
}
