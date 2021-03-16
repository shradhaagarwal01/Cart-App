import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAjDCm8asD42yL7C68utL2iLUfwwvJKSvg",
  authDomain: "cart-d58ba.firebaseapp.com",
  projectId: "cart-d58ba",
  storageBucket: "cart-d58ba.appspot.com",
  messagingSenderId: "604714048307",
  appId: "1:604714048307:web:f38b795d199c5331e47c46"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
