<template>
  <div class="task-info">
    <div class="subject-info">{{ task.subject }}</div>
    <h3>{{ task.name }}</h3>
    <div class="line">
      <p>Credit points:</p>
      <p class="box1">{{ task.creditPoints }}</p>
    </div>
    <div class="line">
      <p>Deadline:</p>
      <p class="box2">{{ task.deadline }}</p>
    </div>
    <div class="line">
      <p>Type:</p>
      <p class="box3">{{ task.type }}</p>
    </div>
    <div class="line">
      <p>Note:</p>
      <p class="note">{{ task.note }}</p>
    </div>
    <button @click="toggleTaskStatus" :class="{ 'finish-button': !task.finished, 'finished-button': task.finished }">
      {{ task.finished ? 'COMPLETED' : 'FINISH' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  methods: {
    toggleTaskStatus() {
      this.$emit('toggle-status', this.task.id);
    },
  },
};
</script>

<style scoped>

.task-info {
  margin-block: 15px;
  background-color: #1E2749;
  padding: 1rem;
  border-radius: 50px;
  color: #D1F9FF;
  width: 230px;
  border: solid 2px #00E0FF;
  position: relative;
}

.subject-info {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1E2749;
  border: solid 2px #00E0FF;
  color: #D1F9FF;
  padding: 0.5rem;
  text-align: center;
  width: 50%;
  border-radius: 18px;
  font-size: 1rem;
}

h3 {
  font-size: 2rem;
}

.line {
  text-align: start;
  padding-inline: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.line > p {
  margin-bottom: 0;
}

.box1 {
  background-color: #FF7C7C;
}

.box2 {
  background-color: #8CF390;
}

.box3 {
  background-color: #8B4DDA;
}

.box1, .box2, .box3 {
  color: #12083C;
  text-align: center;
  min-width: 100px;
  width: fit-content;
  text-wrap: none;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-inline: auto;
  margin-top: 2px;
}

.note {
  font-weight: normal;
  text-align: center;
  margin-top: 2px;
  padding-bottom: 2rem;
}

.finish-button, .finished-button {
  border: solid 2px #00E0FF;
  background-color: #12083C;
  text-align: center;
  min-width: 50%;
  width: fit-content;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
  padding-block: 6px;
  letter-spacing: 2px;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
}

.finish-button {
  color: #00E0FF;
}

.finished-button {
  color: #1ef625;
}

@media (max-width: 767px) {
  .task-info {
    width: 100%;
  }
}

</style>
