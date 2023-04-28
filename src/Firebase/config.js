import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQkQn8kKV_ZUwikGN0DQwAnMUKrzJU-0Y",
  authDomain: "soulpet-afbff.firebaseapp.com",
  projectId: "soulpet-afbff",
  storageBucket: "soulpet-afbff.appspot.com",
  messagingSenderId: "449620075126",
  appId: "1:449620075126:web:9818fd981361ab10c93557",
  measurementId: "G-D055941P8Q"
};

// Inicializa o app com base nas configurações acima 
export const app = initializeApp(firebaseConfig);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);

