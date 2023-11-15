import logo from './logo.svg';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getToken, onMessage, getMessaging, } from "firebase/messaging";
import { useEffect } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

//https://firebase.google.com/docs/cloud-messaging/js/client#configure_web_credentials_in_your_app
//https://www.youtube.com/watch?v=9EAgvpWujsw
const validKey = ""

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);



// https://firebase.google.com/docs/cloud-messaging/js/client#configure_web_credentials_in_your_app

function App() {


  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log(payload);
      alert(payload.notification.title + "\n" + payload.notification.body)
    })
  }, [])



  async function requestPermission() {
    console.log('Requesting permission...');
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      return true;
    }
  }

  const onNotify = () => {
    const accepted = requestPermission();

    if (accepted) {


      getToken(messaging, { vapidKey: validKey }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log({ currentToken });
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
    }

  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="/#"
          onClick={onNotify}
          rel="noopener noreferrer"
        >
          Get Notified
        </a>
      </header>
    </div>
  );
}

export default App;
