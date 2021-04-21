import { createStore } from 'vuex';
import loggerModule from './store/logger.store';
import todosModule from './store/todo.store';

export default createStore({
  modules: {
    logger: loggerModule,
    todos: todosModule
  }
});
