import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import wallet from './modules/wallet'
import network from './modules/network'
import account from './modules/account'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['wallet', 'network', 'route']
})

export default new Vuex.Store({
    modules: {
        wallet,
        network,
        account
    },

    plugins: [vuexLocal.plugin]
})
