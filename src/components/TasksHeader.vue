<template>
  <h1>
    <span class="name">{{ userName }}</span>,
    you have completed <span class="score">{{ completedTasksNum }}/{{ tasksNum }}</span> tasks. Nice...or not? hehe
    <button @click="logout" class="logout-button">Logout</button>
  </h1>
</template>

<script>
export default {
  props: {
    userName: String,
    completedTasksNum: Number,
    tasksNum: Number,
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
  },
};
</script>


<style scoped>

h1 {
  position: relative;
}

.name {
  color: #F33991;
  font-size: 3rem;
}

.score {
  color: #F33991;
  font-weight: bold;
}

.logout-button {
  position: absolute;
  right: 30px;
  top: 30px;
  background-color: transparent;
  border: solid 2px whitesmoke;
  border-radius: 18px;
  color: #ffffff;
  cursor: pointer;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 1rem;
}

.logout-button:hover {
  border: solid 2px #F33991;
}

@media (max-width: 767px) {
  .logout-button {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
