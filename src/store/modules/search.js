import { server } from "@/utils/helper";
import axios from "axios";

// initial state
const state = {
    developers: [],
    documents: [],
};

// getters
const getters = {};

// actions
const actions = {
    getDevelopers({ commit }, data) {
        axios
            .get(`${server.apiUrl}/user/developers/${data.facultyId}`)
            .then(data => { commit('setDevelopers', data.data) });
    },
    getDocuments({ commit }, data) {
        axios
            .post(`${server.apiUrl}/document/search`, {data})
            .then(data => { commit('setDocuments', data.data) });
    }
};

// mutations
const mutations = {
    setDevelopers(state, developers) {
        state.developers = developers;
    },
    setDocuments(state, documencts) {
        state.documents = documencts;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
