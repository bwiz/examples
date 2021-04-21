export default {
  namespaced: true,
  state: () => ({
    counter: 0
  }),
  mutations: {
    setCounter(state, counter) {
      state.counter = counter;
    }
  },
  actions: {
    updateCounter({commit, state}, val) {
      const updatedCounter = state.counter + val;
      commit("setCounter", updatedCounter);
    }
  },
  getters: {
    counter(state) {
      return state.counter;
    },
  },
};
