<template>
     <div class="auth">
        <div class="auth-logo">
            <img src="images/tronmask.png" alt="TronMask">
        </div>

        <h1 class="auth-title">TRONMASK</h1>

        <div v-if="wallet">
            <div class="message error">
                SAVE YOUR PRIVATE KEY
            </div>

            <textarea class="input-field special" type="text" v-model="wallet.privateKey" readonly></textarea>

            <div class="form-info">
                <p><strong>Do not lose it!</strong> It can't be recovered if you lose it.</p>
                <p><strong>Do not share it!</strong> Your funds will be stolen if you use it on a malicious site.</p>
                <p><strong>Make a backup!</strong> Just in case your laptop is set on fire.</p>
            </div>

            <a class="button brand" @click="savePrivateKey">I've copied it somewhere safe</a>
        </div>

        <div v-else>
            <div v-show="error.show" class="message error">
                {{ error.message }}
            </div>

            <form @submit="submitForm" action="" method="post" class="auth-form">
                <input class="input-field" type="password" name="password" placeholder="New Password (min 8 chars)" v-model="password">

                <div class="form-info">
                    This password encrypts your private key. Make sure to remember this password as you will need it to unlock your wallet.
                </div>

                <button class="button brand" type="submit">Create New Wallet</button>

                <div v-if="keystore">
                    <a class="auth-link" @click="$router.back()">Cancel</a>
                </div>

                <div v-else>
                    <div class="line-through">
                        <span>or</span>
                    </div>

                    <router-link class="button" to="/import-wallet">Import Wallet from Private Key</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { encryptKeyStore } from '../keystore'
    import { generateAccount } from '@tronscan/client/src/utils/account'

    export default {
        data: () => ({
            password: '',
            wallet: false,
            error: {
                show: false,
                message: ''
            }
        }),

        computed: mapState([
            'address',
            'keypass',
            'keystore'
        ]),

        methods: {
            submitForm(e) {
                e.preventDefault()

                if (this.password.length < 8) {
                    this.error.show = true
                    this.error.message = 'Password is not long enough'

                    return false
                }

                this.wallet = generateAccount();
            },

            savePrivateKey(e) {
                e.preventDefault()

                const keystore = encryptKeyStore(this.password, this.wallet.privateKey, this.wallet.address)

                this.$store.commit('address', this.wallet.address)
                this.$store.commit('keypass', this.password)
                this.$store.commit('keystore', keystore)
                this.$router.push('/')
            }
        }
    }
</script>
