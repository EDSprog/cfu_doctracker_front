import { server } from "@/utils/helper";
import axios from "axios";

// initial state
const state = {
    documents: [],
};

// getters
const getters = {};

// actions
const actions = {
    getDocuments({ commit }, data) {
        axios
            .post(`${server.apiUrl}/document`, {data})
            .then(data => { commit('setDocuments', data.data) });
    }
};

// mutations
const mutations = {
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
