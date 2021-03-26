import firebase from 'firebase'

var config ={
    
    apiKey: "AIzaSyCmRb_rufvN8WUaPqasyWf0_e-04sbQGAY",
authDomain: "servermonitor-438c8.firebaseapp.com",
databaseURL: "https://servermonitor-438c8-default-rtdb.firebaseio.com",
projectId: "servermonitor-438c8",
storageBucket: "servermonitor-438c8.appspot.com",
messagingSenderId: "733011467248",
appId: "1:733011467248:web:25658be8f7715818579b35",
measurementId: "G-N58QMBECRV"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
export { firebase }
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()