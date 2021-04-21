export default {
  namespaced: true,
  state: () => ({
    todos: [
      { id: 1, text: "clean the house" },
      { id: 2, text: "buy milk" }
    ]
  }),
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    async addTodo({commit, dispatch, state}, input) {
      dispatch('logger/updateCounter', 1, { root:true });

      const id = await dispatch('createNewId');
      input.id = id;

      const todos = [...state.todos, input];
      commit('setTodos', todos);
    },
    deleteTodo({commit, dispatch, state}, id) {

      return new Promise((resolve) => {
        setTimeout(() => {
          commit('setTodos', state.todos.filter(item => item.id !== id));
          dispatch('logger/updateCounter', 1, { root:true });
          resolve();
        }, 5000);
      });
    },
    shuffle({commit, state}) {
      const todos = [...state.todos];

      todos.forEach(todo => {
        todo.text = todo.text.split('').sort(() => {
          return 0.5 - Math.random();
        }).join('');
      });
      commit('setTodos', todos);
    },
    createNewId({state}) {
      const todos = state.todos;

      if (todos.length > 0) {
        return Math.max(...todos.map(t => t.id)) + 1;
      } else {
        return 1;
      }
    }
  },
  getters: {
    todos(state) {
      return state.todos;
    },
  },
};
