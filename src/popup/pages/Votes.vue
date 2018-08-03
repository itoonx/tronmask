<template>
    <div>
        <app-header subtitle="Votes" />

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
            wallet: state => state.wallet
        })
    }
</script>

<style>

</style>

