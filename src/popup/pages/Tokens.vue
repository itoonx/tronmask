<template>
    <div>
        <AppHeader @refresh="loadTokens" />

        <main class="main">
            <div v-if="tokens.length === 0 || tokens.length === 1 & tokens[0].name === 'TRX'" class="message-empty">
                No tokens found
            </div>

            <div v-else>
                <div class="token" v-for="token in tokens" :key="token.name" v-if="token.name !== 'TRX'">
                    <span class="token-name">{{ token.name }}</span>
                    <span class="token-balance">{{ $formatNumber(token.balance, { maximumSignificantDigits: 7 }) }}</span>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { getTokenAmount } from '../../lib/utils'
    import API from '../../lib/api'
    import AppHeader from '../components/AppHeader.vue'

    export default {
        components: {
            AppHeader
        },

        computed: mapState({
            tokens: state => state.account.tokens,
            address: state => state.wallet.address,
            keystore: state => state.wallet.keystore,
        }),

        mounted() {
            this.loadTokens()
        },

        methods: {
            async loadTokens() {
                const accountData = await API.getAccountByAddress(this.address)
                this.$store.commit('account/tokens', accountData.tokenBalances)
            }
        }
    }
</script>
