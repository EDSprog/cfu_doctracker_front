import { server } from "@/utils/helper";
import axios from "axios";

// initial state
const state = {
    faculties: []
};

// getters
const getters = {};

// actions
const actions = {
    getFaculties({ commit }) {
        axios
            .get(`${server.apiUrl}/faculty`)
            .then(data => { commit('setFaculties', data.data) });
    }
};

// mutations
const mutations = {
    setFaculties(state, faculties) {
        state.faculties = faculties;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
