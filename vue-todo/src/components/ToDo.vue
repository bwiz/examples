<template>
  <div class="ToDo">
    <img class="Logo" :src="logo" alt="Vue logo" />
    <h1 class="ToDo-Header">Vue To Do</h1>
    <h2>Counter: {{ counter }}</h2>
    <div class="ToDo-Container">
      <div class="ToDo-Content">
        <ToDoItem v-for="item in list" :item="item" :key="item.id" />
      </div>
      <div class="ToDoInput">
        <input
          type="text"
          placeholder="I need to..."
          v-model="todo"
          v-on:keyup.enter="createNewToDoItem"
        />
        <button class="ToDo-Add" @click="createNewToDoItem">+</button>
      </div>
      <button class="ToDo-Btn" @click="shuffleText">Shuffle</button>
      <div class="ToDo-ErrorContainer">
        <p v-if="showError">Please enter a todo!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ToDoItem from "./ToDoItem.vue";
import Logo from "../assets/logo.png";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "ToDo",
  components: {
    ToDoItem
  },
  computed: {
    ...mapGetters('todos', { list: 'todos'}),
    ...mapGetters('logger', { counter: 'counter'}),
  },
  methods: {
    ...mapActions('todos', ['addTodo', 'shuffle', 'generateId']),
  },
  setup() {
    const todo = ref("");
    const logo = Logo;
    const showError = ref(false);

    function createNewToDoItem() {
      //validate todo
      if (!todo.value) {
        this.displayError();
        return;
      }

      this.addTodo({ text: todo.value });
      todo.value = "";
    }

    function shuffleText() {
      this.shuffle();
    }

    function displayError() {
      showError.value = true;
      const clearTimer = setTimeout(() => (showError.value = false), 3000);
      return () => clearTimeout(clearTimer);
    }

    return {
      todo,
      logo,
      showError,
      createNewToDoItem,
      shuffleText,
      displayError
    };
  }
};
</script>

<style>
.Logo {
  width: 50px;
  position: relative;
  top: 50px;
}

.ToDo {
  text-align: center;
  width: 80vw;
  max-width: 768px;
  height: auto;
  margin: 40px auto;
  border-radius: 10px;
  background: #ffffff;
}

.ToDoInput {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ToDo-Header {
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
    Arial, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  margin: 70px auto 30px;
}

.ToDo-Subheader {
  font-size: 1em;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
    Arial, sans-serif;
  font-weight: 400;
  margin: 4px auto 20px;
}

.ToDo-Add {
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-color: transparent;
  color: #73ff73;
  font-size: 2rem;
  border-radius: 10px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 5px 5px 15px #cccccc, -5px -5px 15px #ffffff;
}

.ToDo-Btn {
  cursor: pointer;
  height: 50px;
  border-color: transparent;
  color: #73ff73;
  font-size: 2rem;
  border-radius: 10px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 5px 5px 15px #cccccc, -5px -5px 15px #ffffff;
}

.ToDo-Add:hover {
  box-shadow: 5px 5px 10px #cccccc, -5px -5px 10px #ffffff;
}

.ToDo-Container {
  width: 80%;
  margin: 0 auto;
}

.ToDo-ErrorContainer {
  height: 100px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 1rem;
}
</style>
