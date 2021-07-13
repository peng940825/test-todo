<script>
export default {
  data: () => ({
    todo: '',
    todoList: null,
  }),
  methods: {
    addNewTodoItem() {
      const data = {
        key: Date.now(),
        text: this.todo,
        disabled: true,
      };
      this.todoList.push(data);
      this.$setLocalStorage('todoList', this.todoList);
      this.todo = '';
    },
    editTodoItem(target) {
      target.disabled = false;
    },
    confirmTodoItem(target) {
      target.disabled = true;
      this.$setLocalStorage('todoList', this.todoList);
    },
    deleteTodoItem(target) {
      this.todoList.splice(target, 1);
      this.$setLocalStorage('todoList', this.todoList);
    },
  },
  created() {
    if (!this.$getLocalStorage('todoList')) this.$setLocalStorage('todoList', []);
    this.todoList = this.$getLocalStorage('todoList');
  },
};
</script>

<template>
  <v-container class="d-flex align-center justify-center">
    <div class="todo-list">
      <div class="header d-flex">
        <v-checkbox color="success" value="success" hide-details></v-checkbox>
        <v-text-field
          solo
          v-model="todo"
          @keyup.enter="addNewTodoItem"
          placeholder="What needs to be done ?"
        ></v-text-field>
      </div>

      <div class="main">
        <div class="todo-list-item d-flex" v-for="(todo, key) in todoList" :key="todo.key">
          <v-checkbox color="success" value="success" hide-details></v-checkbox>
          <v-text-field
            solo
            v-model="todo.text"
            :disabled="todo.disabled"
            @keyup.enter="confirmTodoItem(todo)"
          ></v-text-field>
          <v-btn
            class="ml-3"
            color="primary"
            elevation="3"
            v-if="todo.disabled"
            @click="editTodoItem(todo)"
          >
            Edit
          </v-btn>
          <v-btn class="ml-3" color="success" elevation="3" v-else @click="confirmTodoItem(todo)">
            Confirm
          </v-btn>
          <v-btn class="ml-3" color="error" elevation="3" @click="deleteTodoItem(key)">
            Delete
          </v-btn>
        </div>
      </div>

      <div class="footer">
        <v-btn class="mr-6">All</v-btn>
        <v-btn class="mr-6">Active</v-btn>
        <v-btn>Completed</v-btn>
      </div>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;

  .todo-list {
    width: 600px;

    .footer {
      padding-left: 52px;
    }
  }
}

// vuetify

.v-btn {
  margin-top: 6px;
}

.v-input--checkbox {
  margin: 10px;
}
</style>
