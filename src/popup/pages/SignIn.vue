<template>
     <div class="auth">
        <div class="auth-logo">
            <img src="images/tronmask.png" alt="TronMask">
        </div>

        <h1 class="auth-title">TRONMASK</h1>

        <div class="auth-form">
            <input class="input-field" type="password" name="password" placeholder="Password">

            <button class="button brand" type="submit" @click="state.auth = true">Sign In</button>

            <div class="line-through">
                <span>or</span>
            </div>

            <router-link class="button" to="/create-wallet">Create New Wallet</router-link>
            <router-link class="button" to="/import-wallet">Import Wallet from Private Key</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            state
        }),
        mounted() {
            //
        }
    }
</script>
