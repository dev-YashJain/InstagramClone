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
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';
import instagramLogo from '../assets/Instagram_logo.svg.png';
import whiteLogo from '../assets/whiteLogo.png';
import NavItem from './navItem';

const LeftSide: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        // Initialize darkMode from localStorage
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true'; // If savedMode is 'true', return true, otherwise false
    });
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleDarkModeToggle = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.body.classList.toggle('dark-mode', newMode);
            localStorage.setItem('darkMode', JSON.stringify(newMode)); // Save the mode to localStorage
            return newMode;
        });
    };

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

    // Effect to apply the dark mode class when component mounts
    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    const logo = darkMode ? whiteLogo : instagramLogo;

    return (
        <div className="leftSidePart">
            <div className="logoPart">
                <img className='logoImg' src={logo} alt='Instagram' />
            </div>
            <div className="navBar">
                <Link to="/" className="navLink">
                    <NavItem icon={<HomeIcon className='icons' sx={{ fontSize: "28px" }} />} text="Home" />
                </Link>
                <NavItem icon={<SearchIcon className='icons' sx={{ fontSize: "28px" }} />} text="Search" />
                <NavItem icon={<ExploreIcon className='icons' sx={{ fontSize: "28px" }} />} text="Explore" />
                <NavItem icon={<Reels className='icons' sx={{ fontSize: "28px" }} />} text="Reels" />
                <NavItem icon={<MessageIcon className='icons' sx={{ fontSize: "28px" }} />} text="Message" />
                <NavItem icon={<NotificationIcon className='icons' sx={{ fontSize: "28px" }} />} text="Notification" />
                <NavItem icon={<CreateIcon className='icons' sx={{ fontSize: "28px" }} />} text="Create" />
                <Link to="/profilePage" className="navLink">
                    <NavItem icon={<ProfileIcon className='icons' sx={{ fontSize: "28px" }} />} text="Profile" />
                </Link>

                <NavItem
                    icon={<MenuIcon className='icons' sx={{ fontSize: "28px" }} />}
                    text="More"
                    onClick={toggleDropdown}
                />
                {dropdownOpen && (
                    <div className="dropdown" ref={dropdownRef}>
                        <div className="dropdownItem">Settings</div>
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
