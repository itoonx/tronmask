import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './pages/SignIn.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: to => {
                const paths = [
                    '/signin'
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
        }
    ]
})
