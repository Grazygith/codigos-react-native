
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// AQUI VAI A CONFIGURAÇÃO DO FIREBASE 
// NÃO ESQUEÇA DE INSERIR QUANDO FOR TESTAR

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth  =  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export {db, auth};


