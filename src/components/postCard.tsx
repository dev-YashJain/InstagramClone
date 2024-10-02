import React from 'react';
import '../components/middleSide.css'; // Ensure the path is correct based on your project structure
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LikedIcon from '@mui/icons-material/Favorite'; // Import the filled like icon
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareIcon from '@mui/icons-material/IosShareRounded';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../components/postCard.css'

interface CardProps {
    profile_url: string[];
    name: string;
}

const Card: React.FC<CardProps> = ({ profile_url, name }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);
    const [liked, setLiked] = React.useState<boolean>(false); // State for like button

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? profile_url.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === profile_url.length - 1 ? 0 : prevIndex + 1
        );
    };

    const toggleLike = () => {
        setLiked((prevLiked) => !prevLiked); // Toggle like state
    };

    return (
        <div className="postSection">
            <div className="post">
                {/* Post Header */}
                <div className="postHeader">
                    <div className="profilePhoto">
                        <img src={profile_url[0]} alt={name} />
                    </div>
                    <div className="profileName">{name}</div>
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
                    {/* Left Arrow */}
                    {profile_url.length > 1 && currentImageIndex > 0 && (
                        <ArrowBackIosNewIcon
                            className="prevArrow"
                            onClick={handlePrevImage}
                        />
                    )}

                    {/* Current Image */}
                    <img
                        src={profile_url[currentImageIndex]}
                        alt={`Post image ${currentImageIndex + 1}`}
                        className="postImage active"
                    />

                    {/* Right Arrow */}
                    {profile_url.length > 1 && currentImageIndex < profile_url.length - 1 && (
                        <ArrowForwardIosIcon
                            className="nextArrow"
                            onClick={handleNextImage}
                        />
                    )}

                    {/* Dots Indicator */}
                    {profile_url.length > 1 && (
                        <div className="dotsContainer">
                            {profile_url.map((_, dotIndex) => (
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
                            {/* Like Icon */}
                            {liked ? (
                                <LikedIcon className='icon' style={{ color: 'red' }} onClick={toggleLike} />
                            ) : (
                                <LikeIcon className='icon' onClick={toggleLike} />
                            )}
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
};

export default Card;
