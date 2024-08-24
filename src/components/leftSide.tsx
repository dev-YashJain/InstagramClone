import './leftSide.css'
import instagramLogo from '../assets/Instagram_logo.svg.png'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import Reels from '@mui/icons-material/VideoLibrary';
import MessageIcon from '@mui/icons-material/Message';
import NotificationIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CreateIcon from '@mui/icons-material/Add';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const LeftSide = () => {
    return (
        <div className="leftSidePart">
            <div className="logoPart">
                <img className='logoImg' src={instagramLogo} alt='Instagram' />
            </div>
            <div className="navBar">
                <div className="navItem">
                    <HomeIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">
                        Home
                    </div>
                </div>
                <div className="navItem">
                    <SearchIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">
                        Search
                    </div>
                </div>
                <div className="navItem">
                    <ExploreIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">
                        Explore
                    </div>
                </div>
                <div className="navItem">
                    <Reels className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">
                        Reels
                    </div>
                </div>
                <div className="navItem">
                    <MessageIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">
                        Message
                    </div>
                </div>
                <div className="navItem">
                    <NotificationIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">
                        Notification
                    </div>
                </div>
                <div className="navItem">
                    <CreateIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">
                        Create
                    </div>
                </div>
                <div className="navItem">
                    <ProfileIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">
                        Profile
                    </div>
                </div>
                <div className="navItem">
                    <MenuIcon className='icons' sx={{ fontSize: "28px" }} />
                    <div className="itemText">
                        More
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSide
