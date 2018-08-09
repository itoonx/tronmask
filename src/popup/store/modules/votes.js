export default {
    namespaced: true,

    state: {
        votes: {},
        candidates: [],
        totalVotes: 0
    },

    mutations: {
        votes(state, votes) {
            state.votes = votes
        },

        candidates(state, candidates) {
            state.candidates = candidates
        },

        totalVotes(state, totalVotes) {
            state.totalVotes = totalVotes
        }
    }
}
