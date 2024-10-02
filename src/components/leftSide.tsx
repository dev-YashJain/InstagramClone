// src/components/LeftSide.tsx
import React, { useState, useEffect, useRef, useContext } from 'react';
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
import { DarkModeContext } from '../components/darkModeContext'; // Import the context

const LeftSide: React.FC = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext); // Consume the context
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
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
                <Link to="/reelPage" className='navLink'>
                    <NavItem icon={<Reels className='icons' sx={{ fontSize: "28px" }} />} text="Reels" />
                </Link>
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
                            <Switch checked={darkMode} onChange={toggleDarkMode} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeftSide;
