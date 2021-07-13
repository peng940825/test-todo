<script>
export default {
  data: () => ({
    todo: '',
    todoList: [],
    status: 'all',
  }),
  methods: {
    addNewTodoItem() {
      const data = {
        key: Date.now(),
        text: this.todo,
        disabled: true,
        completed: false,
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
      this.todoList.splice(this.todoList.indexOf(target), 1);
      this.$setLocalStorage('todoList', this.todoList);
    },
    clearTodoList() {
      this.todoList = [];
      this.$setLocalStorage('todoList', this.todoList);
    },
    isCompleted() {
      this.$setLocalStorage('todoList', this.todoList);
    },
    switchStatus(target) {
      this.status = target;
    },
  },
  computed: {
    completedNum() {
      return this.todoList.filter((item) => item.completed).length;
    },
    filterTodoList() {
      if (this.status === 'active') {
        return this.todoList.filter((item) => !item.completed);
      }

      if (this.status === 'completed') {
        return this.todoList.filter((item) => item.completed);
      }

      return this.todoList;
    },
    all: {
      get() {
        if (this.todoList.length === 0) return false;
        return this.completedNum === this.todoList.length ? true : false;
      },
      set() {
        let status = null;

        if (this.completedNum === this.todoList.length) status = false;
        else status = true;

        this.todoList.forEach((item) => {
          item.completed = status;
        });

        this.$setLocalStorage('todoList', this.todoList);
      },
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
      <h1>Todos</h1>

      <div class="header d-flex">
        <v-checkbox v-model="all" color="success" v-if="todoList.length > 0"></v-checkbox>
        <v-text-field
          solo
          v-model="todo"
          @keyup.enter="addNewTodoItem"
          placeholder="What needs to be done ?"
        ></v-text-field>
      </div>

      <div class="main">
        <div class="todo-list-item d-flex" v-for="todo in filterTodoList" :key="todo.key">
          <v-checkbox color="success" v-model="todo.completed" @click="isCompleted"></v-checkbox>
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
          <v-btn class="ml-3" color="error" elevation="3" @click="deleteTodoItem(todo)">
            Delete
          </v-btn>
        </div>
      </div>

      <div class="footer d-flex" v-if="todoList.length > 0">
        <v-btn
          class="mr-6"
          :class="{ 'footer-btn-active': status === 'all' }"
          @click="switchStatus('all')"
        >
          All
        </v-btn>
        <v-btn
          class="mr-6"
          :class="{ 'footer-btn-active': status === 'active' }"
          @click="switchStatus('active')"
        >
          Active
        </v-btn>
        <v-btn
          :class="{ 'footer-btn-active': status === 'completed' }"
          @click="switchStatus('completed')"
        >
          Completed
        </v-btn>
        <v-btn class="ml-auto" dark color="orange" @click="clearTodoList">Clear All</v-btn>
      </div>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;

  .todo-list {
    width: 600px;
    margin-bottom: 320px;

    h1 {
      color: rgba(175, 47, 47, 0.25);
      font-size: 100px;
      text-align: center;
    }

    .footer {
      padding-left: 52px;
    }
  }
}

// active

.footer-btn-active {
  color: white !important;
  background-color: #9c27b0 !important;
}

// vuetify

.v-btn {
  margin-top: 6px;
}

.v-input--checkbox {
  margin: 10px;
}
</style>
