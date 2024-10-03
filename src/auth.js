// import { GoogleAuthProvider } from "firebase/auth/web-extension";
// import { auth } from "./firebase-config";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// export const doCreateUserWithEmailAndPassword = async (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password); 
// }

// export const doSignInWithEmailAndPassword = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
// }

// export const doSignInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     // result.user (obter nome)
//     return result
// }

// export const doSignOut = () => {
//     return auth.signOut();
// }