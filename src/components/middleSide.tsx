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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StoryViewer from './story'; // Import StoryViewer component

const MiddleSide: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(() =>
        storyDetails.storyDetails.map(() => 0)
    );

    const [isStoryOpen, setIsStoryOpen] = useState(false);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(0);

    useEffect(() => {
        const handleStorageChange = () => {
            const savedMode = localStorage.getItem('darkMode');
            setDarkMode(savedMode === 'true');
        };
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

    const openStory = (index: number) => {
        // Check if the selected story has stories before opening
        if (storyDetails.storyDetails[index].stories && storyDetails.storyDetails[index].stories.length > 0) {
            setSelectedStoryIndex(index);
            setIsStoryOpen(true);
        } else {
            // Optionally, you can display an alert or a message here
            console.log("No stories available for this user.");
        }
    };
    
    const closeStory = () => {
        setIsStoryOpen(false);
    };

    const handlePrevImage = (postIndex: number) => {
        setCurrentImageIndexes((prevIndexes) =>
            prevIndexes.map((index, i) =>
                i === postIndex
                    ? index === 0
                        ? storyDetails.storyDetails[postIndex].profile_url.length - 1
                        : index - 1
                    : index
            )
        );
    };

    const handleNextImage = (postIndex: number) => {
        setCurrentImageIndexes((prevIndexes) =>
            prevIndexes.map((index, i) =>
                i === postIndex
                    ? index === storyDetails.storyDetails[postIndex].profile_url.length - 1
                        ? 0
                        : index + 1
                    : index
            )
        );
    };

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
                    <div className="storyParticular" key={index} onClick={() => openStory(index)}>
                        <div className="imageDiv">
                            <img className="statusImg" src={story.profile_url[0] || "https://via.placeholder.com/150"} alt={story.name} />
                        </div>
                        <div className="profileName">
                            {story.name.length > 9 ? `${story.name.substring(0, 9)}...` : story.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Story Viewer Modal */}
            {isStoryOpen && (
                <StoryViewer
                    stories={storyDetails.storyDetails}
                    initialIndex={selectedStoryIndex}
                    onClose={closeStory} 
                />
            )}

            {/* Post Section */}
            {storyDetails.storyDetails.map((story, postIndex) => {
                const currentImageIndex = currentImageIndexes[postIndex];

                return (
                    <div className="postSection" key={postIndex}>
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
                                    <MoreHorizOutlinedIcon style={{ fontSize: '20px' }} />
                                </div>
                            </div>

                            {/* Post Images and Dots */}
                            <div className="postImages">
                                {/* Only show left arrow if it's not the first image */}
                                {story.profile_url.length > 1 && currentImageIndex > 0 && (
                                    <ArrowBackIosNewIcon
                                        className="prevArrow"
                                        onClick={() => handlePrevImage(postIndex)}
                                    />
                                )}

                                {/* Current Image */}
                                <img
                                    src={story.profile_url[currentImageIndex]}
                                    alt={`Post image ${currentImageIndex + 1}`}
                                    className="postImage active"
                                />

                                {/* Only show right arrow if it's not the last image */}
                                {story.profile_url.length > 1 && currentImageIndex < story.profile_url.length - 1 && (
                                    <ArrowForwardIosIcon
                                        className="nextArrow"
                                        onClick={() => handleNextImage(postIndex)}
                                    />
                                )}

                                {/* Dots Indicator */}
                                {story.profile_url.length > 1 && (
                                    <div className="dotsContainer">
                                        {story.profile_url.map((_, dotIndex) => (
                                            <span
                                                key={dotIndex}
                                                className={`dot ${dotIndex === currentImageIndex ? 'activeDot' : ''}`}
                                            ></span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Post Footer */}
                            <div className="postFooter">
                                <div className="footerIcons">
                                    <div className="leftIcons">
                                        <LikeIcon className='icon' />
                                        <CommentIcon className='icon' />
                                        <ShareIcon className='icon' />
                                    </div>
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
                );
            })}
        </div>
    );
};

export default MiddleSide;
