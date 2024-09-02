// DarkModeSwitch.tsx
import React from 'react';
import { Switch } from '@mui/material';

interface DarkModeSwitchProps {
  toggleDarkMode: () => void;
}

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ toggleDarkMode }) => {
  return (
    <div className="dark-mode-switch">
      <Switch onChange={toggleDarkMode} />
      <label>Dark Mode</label>
    </div>
  );
};

export default DarkModeSwitch;
