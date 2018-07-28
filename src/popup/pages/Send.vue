<template>
    <div>
        <app-header subtitle="Send Payment" @refresh="loadTokens" />

        <main class="main">
            <form @submit.prevent="sendPayment" action="" method="post" class="auth-form">
                <div v-show="message.show" class="message" :class="[ message.type ]">
                    {{ message.text }}
                </div>

                <label class="input-label">
                    Receipient Address
                    <input class="input-field" type="text" name="address" v-model="receipient">
                </label>

                <label class="input-label">
                    Token
                    <select class="input-field" v-model="selectedToken">
                        <option v-for="token in tokens" :key="token.name" :value="token">
                            {{ token.name }} ({{ $formatNumber(token.balance, { maximumSignificantDigits: 7 }) }} available)
                        </option>
                    </select>
                </label>

                <label class="input-label">
                    Amount
                    <input class="input-field" type="number" name="amount" v-model="amount" step="any">
                </label>

                <button class="button brand" type="submit">Send</button>
            </form>
        </main>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { decryptKeyStore } from '../../lib/keystore'
    import { getTokenRawAmount } from '../../lib/utils'
    import { isAddressValid } from '@tronscan/client/src/utils/crypto'
    import API from '../../lib/api'
    import AppHeader from '../components/AppHeader.vue'
    import QrcodeVue from 'qrcode.vue'

    export default {
        components: {
            AppHeader,
            QrcodeVue
        },

        data: () => ({
            amount: 0,
            receipient: '',
            selectedToken: false,
            message: {
                show: false,
                type: 'error',
                text: ''
            }
        }),

        computed: mapState({
            wallet: state => state.wallet,
            tokens: state => state.account.tokens
        }),

        mounted() {
            this.loadTokens()
        },

        methods: {
            async loadTokens() {
                const accountData = await API().getAccountByAddress(this.wallet.address)
                this.$store.commit('account/tokens', accountData.tokenBalances)

                if (this.tokens.length > 0) {
                    this.selectedToken = this.tokens[0]
                }
            },

            async sendPayment() {
                this.message.show = false

                if (!isAddressValid(this.receipient)) {
                    this.message.show = true
                    this.message.text = 'Invalid Recipient Address'

                    return false
                }

                if (!this.selectedToken) {
                    this.message.show = true
                    this.message.text = 'Please select token that you want to send'

                    return false
                }

                if (this.amount > this.selectedToken.balance) {
                    this.message.show = true
                    this.message.text = 'Insufficient funds'

                    return false
                }

                const wallet = decryptKeyStore(this.wallet.keypass, this.wallet.keystore)

                if (!wallet) {
                    this.message.show = true
                    this.message.text = 'Something went wrong while trying to broadcast the transaction'

                    return false
                }

                let amount = this.amount

                if (this.selectedToken.name === "TRX") {
                    amount = getTokenRawAmount(this.amount);
                }

                this.$store.commit('loading', true)

                try {
                    const { success } = await API().send(this.selectedToken.name, this.wallet.address, this.receipient, amount)(wallet.privateKey)

                    this.$store.commit('loading', false)

                    this.message.show = true

                    if (success) {
                        this.message.type = 'success'
                        this.message.text = 'Transaction successfully broadcasted to the network'
                    }else {
                        this.message.text = 'Something went wrong while trying to broadcast the transaction'
                    }

                    this.loadTokens()
                    this.receipient = ''
                    this.amount = 0
                } catch (e) {
                    this.$store.commit('loading', false)

                    this.message.show = true
                    this.message.text = 'Something went wrong while trying to broadcast the transaction'
                }
            }
        }
    }
</script>
