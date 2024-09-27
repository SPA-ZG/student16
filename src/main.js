import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvxbUKGK7WWeklc20PNk0bLp4oeJ1p4eg",
    authDomain: "studysync-623e7.firebaseapp.com",
    projectId: "studysync-623e7",
    storageBucket: "studysync-623e7.appspot.com",
    messagingSenderId: "231650710147",
    appId: "1:231650710147:web:787ffc5cd29d4823ea81b6",
    measurementId: "G-9RSRJ83LVG"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); // Access Firestore

createApp(App).use(createPinia()).use(router).provide('db', db).mount('#app');