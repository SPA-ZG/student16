<template>
  <div class="formPage">
    <h1>Create a New Task</h1>
    <form @submit.prevent="submitTask" class="new-task">
      <label for="taskName">Task Name:</label>
      <input v-model.trim="taskName" type="text" id="taskName" required />

      <label for="creditPoints">Credit Points:</label>
      <input v-model.number="creditPoints" type="number" id="creditPoints" required />

      <label for="deadline">Deadline:</label>
      <input v-model.trim="deadline" type="text" id="deadline" required />

      <label for="subject">Subject:</label>
      <input v-model.trim="subject" type="text" id="subject" required />

      <label for="type">Type:</label>
      <input v-model.trim="type" type="text" id="type" required />

      <label for="note">Note:</label>
      <textarea v-model.trim="note" id="note"></textarea>

      <button type="submit">Submit Task</button>
    </form>
    <img src="../assets/newTask.png" alt="NewTask Image" class="custom-image" />

  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      taskName: '',
      creditPoints: 0,
      deadline: '',
      subject: '',
      type: '',
      note: '',
    };
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
  },
  methods: {
    async submitTask() {
      const db = getFirestore();
      const tasksCollection = collection(db, 'tasks');

      // Create a new task object with all the necessary fields
      const newTask = {
        name: this.taskName,
        creditPoints: this.creditPoints,
        deadline: this.deadline,
        subject: this.subject,
        type: this.type,
        note: this.note,
        studentID: this.user.userId,
        finished: false, // Set to false by default
      };

      await addDoc(tasksCollection, newTask);
      // Redirect to TasksPage
      this.$router.push({ name: 'TasksPage', params: { userId: this.user.userId } });
    },
  },
};
</script>

<style scoped>
.formPage {
  background-color: #12083C;
  height: 98vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.formPage > h1 {
  color: whitesmoke;
  margin-top: 0;
  padding-top: 3rem;
}

.new-task {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: whitesmoke;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  background-color: #12083C;
  border: solid 1px #00E0FF;
  border-radius: 18px;
  color: whitesmoke;
}

button {
  width: 30%;
  padding: 1rem;
  font-size: medium;
  font-weight: bold;
  background: linear-gradient(to right, #053E67, #17749F);
  color: #ffffff;
  cursor: pointer;
  border-radius: 18px;
  border: solid 2px #00E0FF;
  margin-block: 1rem;
  text-wrap: none;
}

button:hover {
  background: linear-gradient(to right, #17749F, #053E67);
}

.custom-image {
  scale: 0.6;
  margin-top: 0;
}

@media (max-width: 767px) {
  .new-task {
    margin-inline: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .formPage {
    height: fit-content;
  }
}

</style>
