import { server } from "@/utils/helper";
import axios from "axios";

// initial state
function initialState () {
    return {
        email: null,
        role: null,
        full_name: null,
        photo: null,
        faculty: null,
        facultyId: null
    }
}

// getters
const getters = {};

// actions
const actions = {
    getUserInfo({ rootState, commit }) {
        axios
            .get(`${server.apiUrl}/user/info`, {headers: {
                    Authorization: `Bearer ${rootState.token}`,
                }})
            .then(data => { commit('setUserInfo', data.data) });
    },
    resetState({ commit }) {
        commit('reset');
    }
};

// mutations
const mutations = {
    setUserInfo(state, user) {
        state.email = user.email;
        state.role = user.role;
        state.full_name = user.full_name;
        state.photo = user.photo;
        state.faculty = user.faculty;
        state.facultyId = user.facultyId;
    },
    reset (state) {
        const s = initialState();
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
