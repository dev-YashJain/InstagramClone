import {FC, ReactNode} from 'react';
import styles from './NavItem.module.css';  // Import the CSS module

interface NavItemProps {
  icon: ReactNode;  // The icon component to display
  text: string;           // The text label for the nav item
  onClick?: () => void;   // Optional click handler
}

const NavItem:FC<NavItemProps> = ({ icon, text, onClick }) => {
  return (
    <div className={styles.navItem} onClick={onClick}> {/* Use class from CSS module */}
      {icon}
      <div className={styles.itemText}>{text}</div>    {/* Use class from CSS module */}
    </div>
  );
};

export default NavItem;
