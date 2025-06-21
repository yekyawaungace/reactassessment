// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // 👈 this is important
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // 👈 use createRoot
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);