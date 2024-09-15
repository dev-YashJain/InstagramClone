import React, { useState, useEffect } from 'react';
import storyDetails from '../storyDetails.json'; // Adjust the path if necessary
import '../components/middleSide.css';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareIcon from '@mui/icons-material/IosShareRounded';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderRounded';
import whiteLogo from '../assets/whiteLogo.png';
import instagramLogo from '../assets/Instagram_logo.svg.png';
import NotificationIcon from '@mui/icons-material/FavoriteBorderOutlined';

const MiddleSide: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        // Retrieve dark mode preference from localStorage
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    // Effect to listen to changes in localStorage (e.g., from other components)
    useEffect(() => {
        const handleStorageChange = () => {
            const savedMode = localStorage.getItem('darkMode');
            setDarkMode(savedMode === 'true');
        };

        // Add an event listener to listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const bodyClass = document.body.classList;
        darkMode ? bodyClass.add('dark-mode') : bodyClass.remove('dark-mode');
    }, [darkMode]);

    const logo = darkMode ? whiteLogo : instagramLogo;

    return (
        <div className='middleSidePart'>
            {/* Top logo bar */}
            <div className="topLogo">
                <div><img className='instaImg' src={logo} alt="Instagram" /></div>
                <div><NotificationIcon /></div>
            </div>

            {/* Story Block */}
            <div className="storyBlock">
                {storyDetails.storyDetails.map((story, index) => (
                    <div className="storyParticular" key={index}>
                        <div className="imageDiv">
                            <img className="statusImg" src={story.profile_url[0] || "https://via.placeholder.com/150"} alt={story.name} />
                        </div>
                        <div className="profileName">
                            {story.name.length > 9 ? `${story.name.substring(0, 9)}...` : story.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Post Section */}
            {storyDetails.storyDetails.map((story, index) => (
                <div className="postSection" key={index}>
                    <div className="post">
                        {/* Post Header */}
                        <div className="postHeader">
                            <div className="profilePhoto">
                                <img src={story.profile_url[0]} alt={story.name} />
                            </div>
                            <div className="profileName">{story.name}</div>
                            <div className="blueTick">
                                <CheckCircleOutlineOutlinedIcon style={{ color: 'blue', fontSize: '16px' }} />
                            </div>
                            <div className="time">. 10w .</div>
                            <div className="info">
                                <MoreHorizOutlinedIcon style={{ fontSize: '18px' }} />
                            </div>
                        </div>

                        {/* Post Image */}
                        <div className="postImage">
                            <img src={story.profile_url[0]} alt={story.name} />
                        </div>

                        {/* Post Footer */}
                        <div className="postFooter">
                            <div className="footerIcons">
                                <LikeIcon className='icon' />
                                <CommentIcon className='icon' />
                                <ShareIcon className='icon' />
                                <BookmarkIcon className='bookmark' />
                            </div>
                            <br />
                            <div className="footerLikes">68,321 likes</div>
                            <div className="footerCaption">
                                <div className="footerProfileName">Tom Hanks</div>
                                <div className="blueTick">
                                    <CheckCircleOutlineOutlinedIcon style={{ color: 'blue', fontSize: '16px' }} />
                                </div>
                                <div className="captionText">Strings is all you need.</div>
                            </div>
                            <br />
                            <div className="viewComment">View all 681 comments</div>
                            <div className="addComment">Add a comment...</div>
                        </div>
                        <hr className="postSeparator" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MiddleSide;
