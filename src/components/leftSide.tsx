import React, { useState, useEffect, useRef } from 'react';
import './leftSide.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import Reels from '@mui/icons-material/VideoLibrary';
import MessageIcon from '@mui/icons-material/Message';
import NotificationIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CreateIcon from '@mui/icons-material/Add';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch'; // Import the Switch component

// Import both logos
import instagramLogo from '../assets/Instagram_logo.svg.png';
import whiteLogo from '../assets/whiteLogo.png'; // New logo for dark mode

const LeftSide: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(false); // State for Dark Mode
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Toggle function for Dark Mode
    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode); // Add or remove 'dark-mode' class from body
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Select the logo based on dark mode state
    const logo = darkMode ? whiteLogo : instagramLogo;

    return (
        <div className="leftSidePart">
            <div className="logoPart">
                <img className='logoImg' src={logo} alt='Instagram' />
            </div>
            <div className="navBar">
                <div className="navItem">
                    <HomeIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">Home</div>
                </div>
                <div className="navItem">
                    <SearchIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">Search</div>
                </div>
                <div className="navItem">
                    <ExploreIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">Explore</div>
                </div>
                <div className="navItem">
                    <Reels className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">Reels</div>
                </div>
                <div className="navItem">
                    <MessageIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">Message</div>
                </div>
                <div className="navItem">
                    <NotificationIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">Notification</div>
                </div>
                <div className="navItem">
                    <CreateIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">Create</div>
                </div>
                <div className="navItem">
                    <ProfileIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">Profile</div>
                </div>
                <div className="navItem" onClick={toggleDropdown}>
                    <MenuIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">More</div>
                </div>
                {dropdownOpen && (
                    <div className="dropdown" ref={dropdownRef}>
                        <div className="dropdownItem">Settings</div>
                        {/* Dark Mode Toggle */}
                        <div className="dropdownItem">
                            <span>Dark Mode</span>
                            <Switch checked={darkMode} onChange={handleDarkModeToggle} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeftSide;
