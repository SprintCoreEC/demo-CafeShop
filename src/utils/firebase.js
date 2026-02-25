import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNgkQscUNTtbcubX3031VfsnNMo7qshvA",
    authDomain: "ecommerceweb-fb2cc.firebaseapp.com",
    projectId: "ecommerceweb-fb2cc",
    storageBucket: "ecommerceweb-fb2cc.appspot.com",
    messagingSenderId: "283780586819",
    appId: "1:283780586819:web:e191abb6da48e5919d23f6",
    measurementId: "G-7L2KG11X1Z"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar auth para usar en tus componentes
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app); // 🔥 Asegúrate de tener esto

