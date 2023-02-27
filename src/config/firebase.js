// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAgWwTdmFNmPmkHThu0CcaZejPwgn0tYgk",
   authDomain: "timesheet-98127.firebaseapp.com",
   projectId: "timesheet-98127",
   storageBucket: "timesheet-98127.appspot.com",
   messagingSenderId: "1061132847896",
   appId: "1:1061132847896:web:a34f55def52641c64dec6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;