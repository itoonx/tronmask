<template>
    <header class="header">
        <div class="header-top">
            <router-link class="header-logo" to="/">
                <img src="images/tronmask-small.png" alt="TronMask">
                <span>TRONMASK</span>
            </router-link>

            <div v-click-outside="hideDropdownMenu">
                <a class="dropdown-menu-toggle" @click="toggleDropdownMenu" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -7 24 24" width="24" height="24" preserveAspectRatio="xMinYMin" class="icon"><path d='M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z' /></svg>
                </a>

                <nav class="dropdown-menu" v-show="showDropdownMenu">
                    <router-link to="/send">Send</router-link>
                    <router-link to="/receive">Receive</router-link>
                    <router-link to="/settings">Settings</router-link>
                    <a @click="logout" href="#">Logout</a>
                </nav>
            </div>
        </div>

        <nav class="header-tabs">
            <router-link :class="{ active: route.name == 'account' }" to="/">Account</router-link>
            <router-link :class="{ active: route.name == 'tokens' }" to="/tokens">Tokens</router-link>
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

            logout(e) {
                e.preventDefault()

                this.$store.commit('wallet/address', false)
                this.$store.commit('wallet/keypass', false)
                this.$router.push('/signin')
            }
        }
    }
</script>
