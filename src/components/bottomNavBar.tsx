import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReelsIcon from '@mui/icons-material/SlowMotionVideo';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import './bottomNavBar.css';

const BottomNavBar = () => {
    return (
        <div className="bottomNavBar">
            <Link to="/" className="navItems">
                <HomeIcon />
                <span>Home</span>
            </Link>
            <div className="navItems">
                <ReelsIcon />
                <span>Reels</span>
            </div>
            <Link to="/profilePage" className="navItems">
                <ProfileIcon />
                <span>Profile</span>
            </Link>
        </div>
    );
};

export default BottomNavBar;
