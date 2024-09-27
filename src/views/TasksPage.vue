<template>
  <div class="tasks-page">
    <TasksHeader
        :userName="user.userName"
        :completedTasksNum="completedTasksNum"
        :tasksNum="tasksNum"
        @logout="logout"
    />
    <div class="tasks-container">
      <TaskInfo v-for="task in tasks" :key="task.id" :task="task" @toggle-status="toggleTaskStatus"/>
    </div>
    <RouterLink to="/tasks/new" class="new-task-button">New Task</RouterLink>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import {mapState} from "pinia";
import {useAuthStore} from "@/stores/auth";
import TaskInfo from "@/components/TaskInfo.vue";
import TasksHeader from "@/components/TasksHeader.vue";
import { RouterLink} from "vue-router";

export default {
  components: {
    TaskInfo,
    TasksHeader,
    RouterLink,
  },
  data() {
    return {
      tasks: [],
      completedTasksNum: 0,
      tasksNum: 0,
    };
  },
  async created() {
    this.userId = this.$route.params.userId;

    // Check if the user is in the store, otherwise try to get it from localStorage
    if (!useAuthStore().user.userId) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        useAuthStore().setUser(JSON.parse(storedUser));
      } else {
        this.$router.push({ name: 'LoginPage' });  // Redirect to the login page
        return;
      }
    }

    try {
      const db = getFirestore();
      const q = query(collection(db, 'tasks'), where('studentID', '==', this.userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        this.tasks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          creditPoints: doc.data().creditPoints || 0,
          deadline: doc.data().deadline || "",
          finished: doc.data().finished || false,
          name: doc.data().name || "",
          note: doc.data().note || "",
          studentID: doc.data().studentID || "",
          subject: doc.data().subject || "",
          type: doc.data().type || "",
        }));

        this.completedTasksNum = this.tasks.filter(task => task.finished).length; // Count completed tasks
        this.tasksNum = this.tasks.length;  // Total number of tasks

      }
    } catch (error) {
      // console.error('Error fetching tasks:', error.message);
    }
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
  },
  methods: {
    async toggleTaskStatus(taskId) {
      const updatedTasks = this.tasks.map((task) => {
        if (task.id === taskId) {
          task.finished = !task.finished;
        }
        return task;
      });

      // Update local state
      this.tasks = updatedTasks;
      this.completedTasksNum = this.tasks.filter((task) => task.finished).length;
      // Update Firestore database
      try {
        const db = getFirestore();
        const taskDocRef = doc(db, 'tasks', taskId);
        await updateDoc(taskDocRef, {
          finished: this.tasks.find((task) => task.id === taskId).finished,
        });
      } catch (error) {
        // console.error('Error updating Firestore document:', error.message);
      }
    },
    logout() {
      useAuthStore().setUser({ userId: null, userName: null }); // Clear user from state and localStorage
      localStorage.removeItem("user");

      this.$router.push({ name: 'LoginPage' });
    },
  },
};
</script>

<style scoped>

.tasks-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  padding-inline: 3rem;
}

.name {
  color: #F33991;
  font-size: 3rem;
}

.score {
  color: #F33991;
}

.tasks-page {
  background-color: #12083C;
  min-height: 98vh;
  height: fit-content;
  padding: 0;
  margin: 0;
}

h1 {
  color: whitesmoke;
  margin-top: 0;
  text-align: start;
  padding: 3rem;
  font-size: 2rem;
  font-weight: bold;
}

.new-task-button {
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #053E67, #17749F);
  color: #ffffff;
  cursor: pointer;
  border-radius: 18px;
  border: solid 2px #00E0FF;
  text-decoration: none;
}

.new-task-button:hover {
  background: linear-gradient(to right, #17749F, #053E67);
}

@media (max-width: 767px) {

  .new-task-button {
    font-size: 1rem;
  }

  .tasks-page {
    padding-bottom: 150px;
  }

}
</style>
