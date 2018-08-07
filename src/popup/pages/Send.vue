<template>
    <div>
        <app-header subtitle="Send Payment" @refresh="refreshTokens" />

        <main class="main">
            <form @submit.prevent="showConfirmDialog" action="" method="post" class="auth-form" autocomplete="off">
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
                        <option v-for="token in account.tokens" :key="token.id" :value="token">
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

        <confirm-dialog :text="confirmDialogText" ref="confirmDialog" @confirmed="sendPayment" />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { decryptKeyStore } from '../../lib/keystore'
    import { getTokenRawAmount } from '../../lib/utils'
    import { isAddressValid } from '@tronscan/client/src/utils/crypto'
    import API from '../../lib/api'
    import account from '../mixins/account'
    import AppHeader from '../components/AppHeader.vue'
    import ConfirmDialog from '../components/ConfirmDialog.vue'

    export default {
        mixins: [account],

        components: {
            AppHeader,
            ConfirmDialog
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

        computed: {
            confirmDialogText() {
                return `
                    Are you sure you want to transfer
                    <div><strong>${this.amount} ${this.selectedToken.name}</strong></div>
                    <div>to</div>
                    <div><strong>${this.receipient}</strong> ?</div>
                `
            },
            ...mapState({
                wallet: state => state.wallet
            })
        },

        mounted() {
            this.setSelectedToken()

            if (this.account.tokens.length === 0) {
                this.loadTokens()
            }
        },

        methods: {
            setSelectedToken() {
                if (this.account.tokens.length > 0) {
                    this.selectedToken = this.account.tokens[0]
                }
            },

            async loadTokens() {
                await this.loadAccount()
                this.setSelectedToken()
                this.$store.commit('loading', false)
            },

            async sendPayment() {
                const wallet = decryptKeyStore(this.wallet.keypass, this.wallet.keystore)

                if (!wallet) {
                    this.message.show = true
                    this.message.type = 'error'
                    this.message.text = 'Something went wrong while trying to send the payment'

                    return false
                }

                this.$store.commit('loading', true)

                let amount = this.amount

                if (this.selectedToken.name === "TRX") {
                    amount = getTokenRawAmount(this.amount);
                }

                try {
                    const result = await API().send(this.selectedToken.name, this.wallet.address, this.receipient, amount)(wallet.privateKey)

                    this.$store.commit('loading', false)

                    this.message.show = true

                    if (result.success) {
                        this.message.type = 'success'
                        this.message.text = 'Payment has been successfully sent'
                    }else {
                        this.message.type = 'error'
                        this.message.text = 'Something went wrong while trying to send the payment'
                    }

                    this.loadTokens()
                    this.receipient = ''
                    this.amount = 0
                } catch (e) {
                    this.$store.commit('loading', false)

                    this.message.show = true
                    this.message.type = 'error'
                    this.message.text = 'Something went wrong while trying to send the payment'
                }
            },

            showConfirmDialog(){
                this.message.show = false

                if (!isAddressValid(this.receipient)) {
                    this.message.show = true
                    this.message.type = 'error'
                    this.message.text = 'Invalid recipient address'

                    return false
                }

                if (!this.selectedToken) {
                    this.message.show = true
                    this.message.type = 'error'
                    this.message.text = 'Please select token that you want to send'

                    return false
                }

                if (this.amount > this.selectedToken.balance) {
                    this.message.show = true
                    this.message.type = 'error'
                    this.message.text = 'Insufficient funds'

                    return false
                }

                if (this.amount <= 0) {
                    this.message.show = true
                    this.message.type = 'error'
                    this.message.text = 'Invalid token amount'

                    return false
                }

                this.$refs.confirmDialog.showDialog()
            },

            refreshTokens() {
                this.message.show = false
                this.$store.commit('loading', true)
                this.loadTokens()
            }
        }
    }
</script>
