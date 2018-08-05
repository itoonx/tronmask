<template>
    <div>
        <app-header subtitle="Votes" @refresh="refreshCandidates" />

        <main class="main">
            <div class="search-box">
                <input class="input-field" type="search" placeholder="Search" v-model="search">
            </div>

            <div class="candidates" v-for="candidate in filteredCandidates" :key="candidate.address">
                <div class="candidate-rank">{{ candidate.rank }}</div>
                <div class="candidate-info">
                    <div class="candidate-name">{{ candidate.name || candidate.url }}</div>
                    <div class="candidate-total-votes">{{ $formatNumber(candidate.votes) }}</div>
                </div>
                <div class="candidate-votes">{{ $formatNumber(votes[candidate.address] || 0) }}</div>
            </div>
        </main>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { sortBy, sumBy } from 'lodash'
    import API from '../../lib/api'
    import AppHeader from '../components/AppHeader.vue'

    export default {
        components: {
            AppHeader
        },

        data: () => ({
            search: ''
        }),

        computed: {
            filteredCandidates() {
                return this.candidates.filter(c => c.name.toLowerCase().includes(this.search.toLowerCase()) || c.url.toLowerCase().includes(this.search.toLowerCase()))
            },
            votesSpent(){
                return sumBy(Object.values(this.votes), vote => parseInt(vote, 10) || 0)
            },
            votesAvailable(){
                return this.frozen - this.votesSpent
            },
            ...mapState({
                wallet: state => state.wallet,
                frozen: state => state.account.frozen,
                votes: state => state.votes.votes,
                candidates: state => state.votes.candidates
            })
        },

        mounted() {
            this.loadCandidates()
        },

        methods: {
            async loadCandidates() {
                const votes = await API().getAccountVotes(this.wallet.address)
                const candidatesData = await API().getVotesForCurrentCycle()
                const candidates = sortBy(candidatesData.candidates, c => c.votes * -1).map((c, i) => ({
                    ...c,
                    rank: i + 1
                }))

                this.$store.commit('votes/votes', votes.votes)
                this.$store.commit('votes/candidates', candidates)
                this.$store.commit('loading', false)
            },

            refreshCandidates() {
                this.$store.commit('loading', true)
                this.loadCandidates()
            }
        }
    }
</script>

<style>
    .candidates {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.5s ease;
        background: #FFFFFF;
        border-radius: 5px;
        padding: 0;
        margin-bottom: 0.75rem;
        font-size: 0.75rem;
        color: #424242;
        cursor: pointer;
    }
    .candidates:hover,
    .candidates:focus {
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }
    .candidate-rank {
        width: 46px;
        padding: 0.625rem;
        font-weight: 600;
        text-align: center;
    }
    .candidate-info {
        flex: 1;
        padding: 0.5rem 0;
    }
    .candidate-name {
        font-weight: 600;
        margin-bottom: 3px;
        word-break: break-all;
    }
    .candidate-total-votes {
        color: #9E9E9E;
        font-size: 0.625rem;
        word-break: break-all;
    }
    .candidate-votes {
        padding: 0.75rem 1rem 0.75rem 0.75rem;
        text-align: right;
        word-break: break-all;
    }
</style>

