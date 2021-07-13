<script>
export default {};
</script>

<template>
  <v-container class="d-flex align-center justify-center">
    <div class="todo-list">
      <div class="header d-flex">
        <v-checkbox color="success" value="success" hide-details></v-checkbox>
        <v-text-field label="" placeholder="What needs to be done ?" solo></v-text-field>
      </div>

      <div class="main">
        <div class="todo-list-item d-flex">
          <v-checkbox color="success" value="success" hide-details></v-checkbox>
          <v-text-field solo></v-text-field>
          <v-btn class="ml-3" color="success" elevation="3">Edit</v-btn>
          <v-btn class="ml-3" color="error" elevation="3">Del</v-btn>
        </div>

        <div class="todo-list-item d-flex">
          <v-checkbox color="success" value="success" hide-details></v-checkbox>
          <v-text-field solo></v-text-field>
          <v-btn class="ml-3" color="success" elevation="3">Edit</v-btn>
          <v-btn class="ml-3" color="error" elevation="3">Del</v-btn>
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
