<template>
     <div class="auth">
        <div class="auth-logo">
            <img src="images/tronmask.png" alt="TronMask">
        </div>

        <h1 class="auth-title">TRONMASK</h1>

        <div v-show="error.show" class="message error">
            {{ error.message }}
        </div>

        <form @submit="submitForm" action="" method="post" class="auth-form">
            <input class="input-field" type="password" name="password" placeholder="New Password (min 8 chars)" v-model="password">

            <div class="form-info">
                This password encrypts your private key. Make sure to remember this password as you will need it to unlock your wallet.
            </div>

            <button class="button brand" type="submit">Create New Wallet</button>

            <div v-if="state.keys">
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
</template>

<script>
    export default {
        data: () => ({
            state,
            password: '',
            error: {
                show: false,
                message: ''
            }
        }),
        methods: {
            submitForm(e) {
                e.preventDefault()

                this.error.show = false
                this.error.message = ''

                if (this.password.length < 8) {
                    this.error.show = true
                    this.error.message = 'Password is not long enough'

                    return false
                }
            }
        }
    }
</script>
