<template>
  <div class="homePage">
      <div class="image-container">
        <img src="../assets/sync.png" alt="StudySync Image" class="custom-image" />
      </div>
      <div class="enterSync">
        <h1 class="custom-title">Study<span class="sync-color">Sync</span></h1>
        <div class="input-container">
          <label for="usernameInput" class="custom-label">Enter your username</label>
          <input type="text" id="usernameInput" v-model.trim="username" class="custom-input" />
          <button @click="syncStudies" class="custom-button">Sync your Studies</button>
        </div>
      </div>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { mapState } from 'pinia';
import { useAuthStore } from "@/stores/auth";

export default {
  data() {
    return {
      username: "",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["landingUrl"]),
  },
  methods: {
    async syncStudies() {
      const db = getFirestore();  // Get user from db
      const q = query(collection(db, 'students'), where('userName', '==', this.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {

        const userData = {
          userId: querySnapshot.docs[0].id,
          userName: querySnapshot.docs[0].data().userName,
        };
        useAuthStore().setUser(userData);  // Save user into pinia store
        this.$router.push({ name: 'TasksPage', params: { userId: userData.userId } });

      } else {
        // If user does not exist, create a new user (not the best solution, but it is not a purpose for this project)
        const newUserData = { userName: this.username };
        const newDocRef = await addDoc(collection(db, 'students'), newUserData);
        const newUserId = newDocRef.id;

        useAuthStore().setUser({ userId: newUserId, userName: this.username });

        this.$router.push({ name: 'TasksPage', params: { userId: newUserId } });
      }
    },
  },
};
</script>

<style scoped>
.homePage {
  background-color: #12083C;
  min-height: 98vh;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto auto;
  align-content: space-evenly;
  justify-content: center;
}

.image-container {
  grid-column: 1/2;
  grid-row: 2/4;
  scale: 1.2;
  margin-right: 1rem;
}

.sync-color {
  color: #F33991;
}
.custom-image {
  max-width: 100%;
  height: auto;
}

.enterSync {
  grid-column: 2/4;
  grid-row: 2/5;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.custom-title {
  font-size: 9rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #D1F9FF;
  margin-top: 0;
}

.custom-label {
  width: 40%;
  margin: 10px;
  color: aliceblue;
  font-size: medium;
  font-weight: bold;
  text-align: start;
}

.custom-input {
  width: 40%;
  padding: 1rem 2rem;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 18px;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.custom-button {
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
}

.custom-button:hover {
  background: linear-gradient(to right, #17749F, #053E67);
}

@media (max-width: 767px) {
  .homePage {
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding-top: 30%;
  }

  img {
    height: 500px;
    width: 250px;
  }

  .enterSync {
    width: 100%;
  }

  .custom-title {
    font-size: 3rem;
  }

  .custom-button, .custom-input, .custom-label  {
    width: 50%;
    margin-inline: auto;
    text-align: center;
  }
}
</style>
