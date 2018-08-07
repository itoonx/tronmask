import API from '../../lib/api'
import { mapState } from 'vuex'
import { getTokenAmount } from '../../lib/utils'

export default {
    computed: mapState({
        account: state => state.account,
        address: state => state.wallet.address
    }),

    methods: {
        async loadAccount() {
            const accountData = await API().getAccountByAddress(this.address)

            let account = {}
            account.balance = getTokenAmount(accountData.balance)
            account.bandwidth = accountData.bandwidth.netRemaining
            account.freeBandwidth = accountData.bandwidth.freeNetRemaining
            account.frozen = getTokenAmount(accountData.frozen.total)
            account.frozenExpires = (accountData.frozen.balances.length > 0) ? accountData.frozen.balances[0].expires : 0

            const tokens = accountData.tokenBalances.map((t, i) => ({
                ...t,
                id: i + 1
            }))

            this.$store.commit('account/change', account)
            this.$store.commit('account/tokens', tokens)
        },

        async refreshAccount() {
            this.$store.commit('loading', true)
            await this.loadAccount()
            this.$store.commit('loading', false)
        }
    }
}
