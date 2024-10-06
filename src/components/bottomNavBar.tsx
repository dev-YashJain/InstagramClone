import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReelsIcon from '@mui/icons-material/SlowMotionVideo';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import classes from './BottomNavbar.module.css'; // Updated import for CSS Module

const BottomNavBar = () => {
    return (
        <div className={classes.bottomNavBar}> {/* Updated className */}
            <Link to="/" className={classes.navItems}> {/* Updated className */}
                <HomeIcon />
                {/* <span>Home</span> */}
            </Link>
            <div className={classes.navItems}> {/* Updated className */}
                <Link to="/reelPage" className={classes.navItems}> {/* Updated className */}
                    <ReelsIcon />
                    {/* <span>Reels</span> */}
                </Link>
            </div>
            <Link to="/profilePage" className={classes.navItems}> {/* Updated className */}
                <ProfileIcon />
                {/* <span>Profile</span> */}
            </Link>
        </div>
    );
};

export default BottomNavBar;
