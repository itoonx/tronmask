import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    state: {
        address: false,
        keypass: false,
        keystore: false
    },
    mutations: {
        address(state, address) {
            state.address = address
        },

        keypass(state, keypass) {
            state.keypass = keypass
        },

        keystore(state, keystore) {
            state.keystore = keystore
        }
    },
    plugins: [vuexLocal.plugin]
})
