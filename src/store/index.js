import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        perms: [],
        userInfo: {},
        token: ""
    },
    mutations: {
        setPerms(state, perms) {
            state.perms = perms
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {},
    getters: {
        perms(state) {
            return state.perms
        },
        userInfo(state) {
            return state.userInfo
        },
        token(state) {
            return state.token
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})

export default store