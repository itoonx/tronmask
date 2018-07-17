<template>
    <div>
        <AppHeader />

        <main class="main">

        </main>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import AppHeader from '../components/AppHeader.vue'

    export default {
        components: {
            AppHeader
        },

        computed: mapState({
            address: state => state.wallet.address,
            keystore: state => state.wallet.keystore,
        }),

        mounted() {
            //
        },

        methods: {
            //
        }
    }
</script>
