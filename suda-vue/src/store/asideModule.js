export default {
    namespaced: true,
    state: {
        isCollapse: false,
    },
    actions: {},
    mutations: {
        changeCollapse(state, value) {
            state.isCollapse = !state.isCollapse
        }
    }
}