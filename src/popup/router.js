import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './pages/SignIn.vue'
import CreateWallet from './pages/CreateWallet.vue'
import ImportWallet from './pages/ImportWallet.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: to => {
                const authPaths = [ '/signin', '/create-wallet' ]
                let authPath = (state.keys) ? authPaths[0] : authPaths[1]

                const paths = [
                    authPath
                ]

                let landing = localStorage.getItem('landing')
                landing = (landing) ? landing : 1

                return paths[landing - 1]
            }
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignIn
        },
        {
            path: '/create-wallet',
            name: 'create-wallet',
            component: CreateWallet
        },
        {
            path: '/import-wallet',
            name: 'import-wallet',
            component: ImportWallet
        }
    ]
})
