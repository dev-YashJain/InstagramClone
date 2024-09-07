// NavItem.tsx
import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;  // The icon component to display
  text: string;           // The text label for the nav item
  onClick?: () => void;   // Optional click handler
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, onClick }) => {
  return (
    <div className="navItem" onClick={onClick}>
      {icon}
      <div className="itemText">{text}</div>
    </div>
  );
};

export default NavItem;
