import cookieutil from "@/utils/cookieutil.js";

export default {
    namespaced: true,
    state: {
        token: cookieutil.getCookie('token')
    },
    getters: {
        token: (state) => {
            return state.token;
        }
    },
    mutations: {
        saveToken(state, token) {
            state.token = token;
            cookieutil.setCookie("token", token, 30);
        },
        clearToken(state) {
            state.token = null;
            cookieutil.delCookie("token");
        }
    },
    actions: {
        saveToken({ commit }, token) {
            commit('saveToken', token)
        },
        clearToken({ commit }) {
            commit('clearToken')
        }
    }
}