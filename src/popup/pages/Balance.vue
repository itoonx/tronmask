<template>
     <div class="auth">
        <div class="auth-logo">
            <img src="images/tronmask.png" alt="TronMask">
        </div>

        <h1 class="auth-title">TRONMASK</h1>

        <pre>{{ address }}</pre>

        <a class="button brand" @click="logout">Logout</a>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: mapState([
            'address',
            'keypass',
            'keystore'
        ]),

        methods: {
            logout(e) {
                e.preventDefault()

                this.$store.commit('address', false)
                this.$store.commit('keypass', false)
                this.$router.push('/signin')
            }
        }
    }
</script>
