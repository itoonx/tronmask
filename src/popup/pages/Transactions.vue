<template>
    <div>
        <app-header @refresh="loadTransactions" />

        <main class="main">
            <div v-if="transactions.length === 0" class="message-empty">
                No transactions yet
            </div>

            <div v-else>
                <div>
                    <external-link :url="getTransactionLink(transaction.hash)" class="transaction" v-for="transaction in transactions" :key="transaction.hash">
                        <span class="transaction-content">
                            <span class="transaction-contract">{{ getContractName(transaction.contractType) }}</span>
                            <span class="transaction-date">{{ $formatDate(transaction.timestamp, { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
                        </span>

                        <span class="transaction-icon">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20zM2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm10.54.7L9 14.25l-1.41-1.41L10.4 10 7.6 7.17 9 5.76 13.24 10l-.7.7z"/></svg>
                        </span>
                    </external-link>
                </div>

                <a class="load-more" v-show="page < lastPage && ! loadMoreLoading" href="#" @click="loadMore">Load More</a>
            </div>
        </main>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { CONTRACT_TYPES, getTronScanLink } from '../../lib/utils'
    import API from '../../lib/api'
    import AppHeader from '../components/AppHeader.vue'
    import ExternalLink from '../components/ExternalLink.vue'

    export default {
        components: {
            AppHeader,
            ExternalLink
        },

        data: () => ({
            start: 0,
            limit: 30,
            page: 1,
            lastPage: 1,
            loadMoreLoading: false
        }),

        computed: mapState({
            address: state => state.wallet.address,
            keystore: state => state.wallet.keystore,
            transactions: state => state.account.transactions,
        }),

        mounted() {
            this.loadTransactions()
        },

        methods: {
            async loadTransactions() {
                this.page = 1
                this.start = 0

                const transactionsData = await API.getTransactions({ address: this.address, start: this.start , limit: this.limit })
                this.lastPage = Math.ceil(transactionsData.total / this.limit)

                this.$store.commit('account/transactions', transactionsData.transactions)
            },

            async loadMore(e) {
                e.preventDefault();
                this.loadMoreLoading = true

                this.start += this.limit
                const transactionsData = await API.getTransactions({ address: this.address, start: this.start, limit: this.limit })

                this.page += 1
                this.$store.commit('account/pushTransactions', transactionsData.transactions)
                this.loadMoreLoading = false
            },

            getContractName(contractType) {
                return CONTRACT_TYPES[contractType]
            },

            getTransactionLink(hash) {
                const path = 'transaction/' + hash

                return getTronScanLink(path)
            }
        }
    }
</script>
