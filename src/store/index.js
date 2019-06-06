import Vue from 'vue'
import Vuex from 'vuex'
import uuidv4 from 'uuid/v4'
import dashboard from './modules/dashboard'
import faculties from './modules/faculties'
import search from './modules/search'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

function initialState () {
    return {
        token: null,
        id: 0
    }
}

export default new Vuex.Store({
    state: initialState,
    getters: {
        id: state => state.id
    },
    mutations: {
        setId(state, id) {
            state.id = id;
        },
        setToken(state, token) {
            state.token = token;
        },
        resetState(state) {
            const s = initialState();
            Object.keys(s).forEach(key => {
                state[key] = s[key]
            })
        }
    },
    actions: {
        setBasics({commit}, data) {
            commit('setId', data.user.id);
            commit('setToken', data.token);
        },
        logOut({ dispatch, commit }) {
            commit('resetState');
            dispatch('user/resetState');
        },
    },
    modules: {
        dashboard,
        faculties,
        search,
        user
    },
    strict: debug
})
