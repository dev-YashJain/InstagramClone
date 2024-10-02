// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DarkModeProvider } from './components/darkModeContext'; // Adjust the path as necessary
import './App.css'; // Ensure your global styles are imported here

ReactDOM.render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
