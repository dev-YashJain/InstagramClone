import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/profilePage'; // Import the ProfilePage component
import HomePage from './pages/homePage'
import ReelPage from './pages/reelPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/reelPage" element={<ReelPage />} />
      </Routes>
    </Router>
  );
};

export default App;


