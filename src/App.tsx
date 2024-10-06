import { FC, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ReelPage from './pages/ReelPage';
import { DarkModeProvider, DarkModeContext } from './context/DarkModeContext'; // Import your context
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <DarkModeProvider> {/* Wrap your app with the provider */}
      <AppContent />
    </DarkModeProvider>
  );
};

// Separate component to use context
const AppContent: FC = () => {
  const { darkMode } = useContext(DarkModeContext); // Use DarkModeContext here

  return (
    <div className={darkMode ? styles.darkMode : styles.lightMode}> {/* Apply dark mode styles */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/reelPage" element={<ReelPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
