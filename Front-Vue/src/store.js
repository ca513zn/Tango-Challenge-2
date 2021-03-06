import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user : {}
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token){
            state.status = 'success'
            state.token = token

        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },

    },
    actions: {
        login({commit}, user_){
            return new Promise((resolve, reject) => {
                commit('auth_request')

                axios({url: '/api/auth/token/login/', data: user_, method: 'POST'})
                    .then(resp => {

                        const token = 'Token ' + resp.data.auth_token

                        localStorage.setItem('token', token)

                        axios.defaults.headers.common['Authorization'] = token

                        commit('auth_success', token)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')

                        reject(err)
                    })

            })
        },
        logout({commit}){
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')

                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,

    }
})