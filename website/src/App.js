import logo from './logo.svg';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVwA4Qr0UU9OMHF2lSV80XwSab8ur9LPE",
  authDomain: "m2kdevs.firebaseapp.com",
  databaseURL: "https://m2kdevs.firebaseio.com",
  projectId: "m2kdevs",
  storageBucket: "m2kdevs.appspot.com",
  messagingSenderId: "780886334097",
  appId: "1:780886334097:web:a3900b2a47094b618bfd30",
  measurementId: "G-QQSW68F957"
};

//https://firebase.google.com/docs/cloud-messaging/js/client#configure_web_credentials_in_your_app
//https://www.youtube.com/watch?v=9EAgvpWujsw
const validKey = "BHDtR776Q2R87YNRn0VhtO6OIe0IB2UauPYeRBiw06x_p7BAkGn3_S_ScLzQVyeeCfgxEIJMAlbC3jFoVj-nAfc"

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// https://firebase.google.com/docs/cloud-messaging/js/client#configure_web_credentials_in_your_app

function App() {

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
      
      // Initialize Firebase Cloud Messaging and get a reference to the service
      const messaging = getMessaging(app);

      getToken(messaging, { vapidKey: validKey }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log(currentToken);
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
