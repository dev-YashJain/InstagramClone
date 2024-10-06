import { FC, useState, useEffect, useRef, useContext, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import {
    Home as HomeIcon,
    Search as SearchIcon,
    Explore as ExploreIcon,
    VideoLibrary as ReelsIcon,
    Message as MessageIcon,
    FavoriteBorderOutlined as NotificationIcon,
    Add as CreateIcon,
    AccountCircle as ProfileIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import Switch from '@mui/material/Switch';
import classes from './LeftSide.module.css'; // Using CSS Modules
import NavItem from './NavItem'; // Custom NavItem Component
import { DarkModeContext } from '../context/DarkModeContext'; // Importing the context
import instagramLogo from '../assets/Instagram_logo.svg.png';
import whiteLogo from '../assets/whiteLogo.png';

const LeftSide: FC = () => {
    // Using the Dark Mode context with proper types
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    // Explicitly setting the type for useState
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const iconStyle = { fontSize: '28px' }; // Shared icon style

    const handleDropdownToggle = (): void => {
        setDropdownOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
        return () => {
            document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
        };
    }, []);

    const logoSrc = darkMode ? whiteLogo : instagramLogo;

    return (
        <div className={`${classes.leftSidePart} ${darkMode ? classes.darkMode : ''}`}>
            <div className={classes.logoPart}>
                <img className={classes.logoImg} src={logoSrc} alt="Instagram Logo" />
            </div>
            <nav className={classes.navBar}>
                <Link to="/" className={classes.navLink}>
                    <NavItem icon={<HomeIcon sx={iconStyle} />} text="Home" />
                </Link>
                <NavItem icon={<SearchIcon sx={iconStyle} />} text="Search" />
                <NavItem icon={<ExploreIcon sx={iconStyle} />} text="Explore" />
                <Link to="/reelPage" className={classes.navLink}>
                    <NavItem icon={<ReelsIcon sx={iconStyle} />} text="Reels" />
                </Link>
                <NavItem icon={<MessageIcon sx={iconStyle} />} text="Message" />
                <NavItem icon={<NotificationIcon sx={iconStyle} />} text="Notification" />
                <NavItem icon={<CreateIcon sx={iconStyle} />} text="Create" />
                <Link to="/profilePage" className={classes.navLink}>
                    <NavItem icon={<ProfileIcon sx={iconStyle} />} text="Profile" />
                </Link>
                <NavItem
                    icon={<MenuIcon sx={iconStyle} />}
                    text="More"
                    onClick={handleDropdownToggle}
                />
                {dropdownOpen && (
                    <div className={classes.dropdown} ref={dropdownRef}>
                        <div className={classes.dropdownItem}>Settings</div>
                        <div className={classes.dropdownItem}>
                            <span>Dark Mode</span>
                            <Switch checked={darkMode} onChange={toggleDarkMode} />
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default LeftSide;
