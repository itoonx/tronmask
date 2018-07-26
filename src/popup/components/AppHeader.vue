<template>
    <header class="header">
        <div class="header-top">
            <router-link class="header-logo" to="/">
                <img src="images/tronmask-small.png" alt="TronMask">
                <span>TRONMASK</span>
            </router-link>

            <div v-click-outside="hideDropdownMenu">
                <a class="dropdown-menu-toggle" @click="toggleDropdownMenu" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="icon"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </a>

                <nav class="dropdown-menu" v-show="showDropdownMenu">
                    <router-link to="/send">Send</router-link>
                    <router-link to="/receive">Receive</router-link>
                    <a @click="refreshData">Refresh</a>
                    <router-link to="/settings">Settings</router-link>
                    <a @click="logout" href="#">Logout</a>
                </nav>
            </div>
        </div>

        <nav class="header-tabs">
            <router-link :class="{ active: route.name == 'account' }" to="/">Account</router-link>
            <router-link :class="{ active: route.name == 'tokens' }" to="/tokens">Tokens</router-link>
            <router-link :class="{ active: route.name == 'transfers' }" to="/transfers">Transfers</router-link>
            <router-link :class="{ active: route.name == 'transactions' }" to="/transactions">Transactions</router-link>
        </nav>
    </header>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data: () => ({
            showDropdownMenu: false
        }),

        computed: mapState({
            route: state => state.route,
        }),

        methods: {
            toggleDropdownMenu(e) {
                e.preventDefault()

                this.showDropdownMenu = (this.showDropdownMenu) ? false : true
            },

            hideDropdownMenu() {
                this.showDropdownMenu = false
            },

            refreshData(e) {
                e.preventDefault()

                this.$emit('refresh')
                this.showDropdownMenu = false
            },

            logout(e) {
                e.preventDefault()

                this.$store.commit('wallet/address', false)
                this.$store.commit('wallet/keypass', false)
                this.$router.push('/signin')
            }
        }
    }
</script>
