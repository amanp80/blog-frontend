import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // We'll create this file for styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
