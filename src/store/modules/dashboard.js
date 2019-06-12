import { server } from "@/utils/helper";
import axios from "axios";

// initial state
const state = {
    docFlow: {
        inDevelop: [],
        inRefactoring: [],
        accept: [],
        all: [],
    },
    byFaculties: {
        faculties: [],
        values: [],
    },

};

// getters
const getters = {};

// actions
const actions = {
    getDocFlow({ commit }) {
        axios
            .get(`${server.apiUrl}/document`)
            .then(data => { commit('setDocFlow', data.data) });
    },
    getDocFlowByFaculty({ commit, rootState }) {
        axios
            .post(`${server.apiUrl}/dialogues`, {userID: rootState.id})
            .then(data => { commit('setCurrentDialogueId', data) });
    }
};

// mutations
const mutations = {
    setDocFlow(state, docFlow) {
        state.docFlow.inDevelop = docFlow.inDevelop;
        state.docFlow.inRefactoring = docFlow.inRefactoring;
        state.docFlow.accept = docFlow.accept;
        state.docFlow.all = docFlow.all;
    },
    setDocFlowByFaculty (state, byFaculties) {
        state.byFaculties.faculties = byFaculties.faculties;
        state.byFaculties.values = byFaculties.values;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
