import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { DarkModeProvider } from './context/DarkModeContext'; // Adjust the path as necessary
import './App.module.css'; 

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Ensure to cast to HTMLElement

// Render the application
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>
);