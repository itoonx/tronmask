<template>
    <div>
        <app-header @refresh="refreshAccount" />

        <main class="main">
            <div class="box highlight">
                <div class="box-label">Account Balance</div>

                <div class="box-balance">{{ $formatNumber(account.balance, { maximumSignificantDigits: 7 }) }}</div>
                <div class="box-balance-code">TRX</div>

                <div class="box-address-label">Address</div>
                <div class="box-address">{{ address }}</div>

                <div class="box-buttons">
                    <router-link class="green" to="/receive"><span>Receive</span></router-link>
                    <router-link class="red" to="/send"><span>Send</span></router-link>
                </div>
            </div>

            <div class="box no-padding">
                <div class="box-row">
                    <div class="box-column">
                        <div class="box-balance">{{ $formatNumber(account.freeBandwidth) }}</div>
                        <div class="box-balance-code">Free Bandwidth</div>
                    </div>

                    <div class="box-column">
                        <div class="box-balance">{{ $formatNumber(account.bandwidth) }}</div>
                        <div class="box-balance-code">Bandwidth</div>
                    </div>
                </div>

                <div class="box-row">
                    <div class="box-column">
                        <div class="box-balance">{{ $formatNumber(account.frozen) }}</div>
                        <div class="box-balance-code">TRON Power</div>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="box-label">Frozen Balance</div>

                <div class="box-balance">{{ $formatNumber(account.frozen) }}</div>
                <div class="box-balance-code">TRX</div>
                <div v-show="account.frozen > 0" class="box-expires">
                    Expires : {{ $formatDate(account.frozenExpires) }} {{ $formatTime(account.frozenExpires) }}
                </div>

                <div class="box-text">
                    <p>TRX can be frozen to gain TRON Power and enable additional features. For example, with TRON Power you can vote for Super Representatives.</p>
                    <p>Frozen tokens are "locked" for a period of 3 days. During this period the frozen TRX cannot be traded. After this period you can unfreeze the TRX and trade the tokens.</p>
                </div>

                <div class="box-buttons">
                    <router-link v-show="account.frozen > 0" class="red" to="/unfreeze"><span>Unfreeze</span></router-link>
                    <router-link class="blue" to="/freeze"><span>Freeze</span></router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import account from '../mixins/account'
    import AppHeader from '../components/AppHeader.vue'

    export default {
        mixins: [account],

        components: {
            AppHeader
        },

        mounted() {
            this.loadAccount()
        }
    }
</script>
