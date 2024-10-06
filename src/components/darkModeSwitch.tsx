import React from 'react';
import { Switch } from '@mui/material';
import classes from './DarkModeSwitch.module.css'; // Updated to CSS Module

interface DarkModeSwitchProps {
  toggleDarkMode: () => void;
}

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ toggleDarkMode }) => {
  return (
    <div className={classes.darkModeSwitch}> {/* Updated className */}
      <Switch onChange={toggleDarkMode} />
      <label>Dark Mode</label>
    </div>
  );
};

export default DarkModeSwitch;
