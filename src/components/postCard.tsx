import {FC, useState} from 'react';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LikedIcon from '@mui/icons-material/Favorite'; // Import the filled like icon
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareIcon from '@mui/icons-material/IosShareRounded';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import classes from '../components/PostCard.module.css'; // Updated to CSS Module

interface CardProps {
    profile_url: string[];
    name: string;
}

const Card: FC<CardProps> = ({ profile_url, name }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false); // State for like button

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
        <div className={classes.postSection}> 
            <div className={classes.post}> 
                {/* Post Header */}
                <div className={classes.postHeader}> 
                    <div className={classes.profilePhoto}> 
                        <img src={profile_url[0]} alt={name} />
                    </div>
                    <div className={classes.profileName}>{name}</div>
                    <div className={classes.blueTick}> 
                        <CheckCircleOutlineOutlinedIcon style={{ color: 'blue', fontSize: '16px' }} />
                    </div>
                    <div className={classes.time}>. 10w .</div>
                    <div className={classes.info}> 
                        <MoreHorizOutlinedIcon style={{ fontSize: '20px' }} />
                    </div>
                </div>

                {/* Post Images and Dots */}
                <div className={classes.postImages}> 
                    {/* Left Arrow */}
                    {profile_url.length > 1 && currentImageIndex > 0 && (
                        <ArrowBackIosNewIcon
                            className={classes.prevArrow} // Updated className
                            onClick={handlePrevImage}
                        />
                    )}

                    {/* Current Image */}
                    <img
                        src={profile_url[currentImageIndex]}
                        alt={`Post image ${currentImageIndex + 1}`}
                        className={`${classes.postImage} ${classes.active}`} // Updated className
                    />

                    {/* Right Arrow */}
                    {profile_url.length > 1 && currentImageIndex < profile_url.length - 1 && (
                        <ArrowForwardIosIcon
                            className={classes.nextArrow} // Updated className
                            onClick={handleNextImage}
                        />
                    )}

                    {/* Dots Indicator */}
                    {profile_url.length > 1 && (
                        <div className={classes.dotsContainer}> 
                            {profile_url.map((_, dotIndex) => (
                                <span
                                    key={dotIndex}
                                    className={`${classes.dot} ${dotIndex === currentImageIndex ? classes.activeDot : ''}`} // Updated className
                                ></span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Post Footer */}
                <div className={classes.postFooter}> 
                    <div className={classes.footerIcons}> 
                        <div className={classes.leftIcons}> 
                            {/* Like Icon */}
                            {liked ? (
                                <LikedIcon className={classes.icon} style={{ color: 'red' }} onClick={toggleLike} />
                            ) : (
                                <LikeIcon className={classes.icon} onClick={toggleLike} />
                            )}
                            <CommentIcon className={classes.icon} />
                            <ShareIcon className={classes.icon} />
                        </div>
                        <BookmarkIcon className={classes.bookmark} /> 
                    </div>
                    <br />
                    <div className={classes.footerLikes}>68,321 likes</div>
                    <div className={classes.footerCaption}> 
                        <div className={classes.footerProfileName}>Tom Hanks</div>
                        <div className={classes.blueTick}> 
                            <CheckCircleOutlineOutlinedIcon style={{ color: 'blue', fontSize: '16px' }} />
                        </div>
                        <div className={classes.captionText}>Strings is all you need.</div>
                    </div>
                    <br />
                    <div className={classes.viewComment}>View all 681 comments</div>
                    <div className={classes.addComment}>Add a comment...</div>
                </div>
                <hr className={classes.postSeparator} /> 
            </div>
        </div>
    );
};

export default Card;
