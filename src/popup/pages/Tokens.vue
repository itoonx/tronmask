<template>
    <div>
        <app-header @refresh="refreshAccount" />

        <main class="main">
            <div v-if="account.tokens.length === 0 || account.tokens.length === 1 & account.tokens[0].name === 'TRX'" class="message-empty">
                No tokens found
            </div>

            <div v-else>
                <div class="token" v-for="token in account.tokens" :key="token.id" v-if="token.name !== 'TRX'">
                    <span class="token-name">{{ token.name }}</span>
                    <span class="token-balance">{{ $formatNumber(token.balance, { maximumSignificantDigits: 7 }) }}</span>
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
            if (this.account.tokens.length === 0) {
                this.loadAccount()
            }
        }
    }
</script>

<style>
    .token {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        background: #FFFFFF;
        border-radius: 5px;
        padding: 1rem;
        margin-bottom: 0.75rem;
    }
    .token span {
        display: block;
    }
    .token-name {
        color: #9E9E9E;
        font-size: 0.875rem;
    }
    .token-balance {
        font-size: 1rem;
        font-weight: 600;
        text-align: right;
        word-break: break-all;
        padding-left: 1rem;
    }
</style>

