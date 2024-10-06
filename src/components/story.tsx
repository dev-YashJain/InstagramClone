import { FC, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../components/Story.module.css'; // Update import for CSS module
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LikedIcon from '@mui/icons-material/Favorite';

interface Story {
    profile_url: string[];
    name: string;
    stories: string[];
}

interface StoryProps {
    stories: Story[];
    initialIndex: number;
    onClose: () => void;
}

const StoryViewer: FC<StoryProps> = ({ stories, initialIndex, onClose }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(initialIndex);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageProgress, setImageProgress] = useState<number[]>(new Array(stories[initialIndex]?.stories.length).fill(0));
    const [liked, setLiked] = useState<boolean[]>(new Array(stories.length).fill(false));
    const navigate = useNavigate();

    // Memoize current story and image count for performance optimization
    const currentStory = useMemo(() => stories[currentStoryIndex], [stories, currentStoryIndex]);
    const imageCount = useMemo(() => currentStory?.stories?.length || 0, [currentStory]);

    // Navigate to the home page if there are no stories
    useEffect(() => {
        if (!currentStory || imageCount === 0) {
            navigate('/');
        }
    }, [currentStory, imageCount, navigate]);

    // Manage the image progress and change image when progress reaches 100%
    useEffect(() => {
        const interval = setInterval(() => {
            setImageProgress((prevProgress) => {
                const updatedProgress = [...prevProgress];
                if (updatedProgress[currentImageIndex] < 100) {
                    updatedProgress[currentImageIndex] += (100 / 30); // Increment based on time interval
                }
                return updatedProgress;
            });
        }, 100);

        if (imageProgress[currentImageIndex] >= 100) {
            handleNextImage();
        }

        return () => clearInterval(interval); // Clear interval to prevent memory leaks
    }, [imageProgress, currentImageIndex]);

    // Reset progress when story or image changes
    useEffect(() => {
        setImageProgress(new Array(imageCount).fill(0));
    }, [currentImageIndex, currentStoryIndex, imageCount]);

    // Handle advancing to the next image
    const handleNextImage = () => {
        if (currentImageIndex < imageCount - 1) {
            setCurrentImageIndex((prevIndex) => prevIndex + 1);
        } else {
            handleNextStory();
        }
    };

    // Handle returning to the previous image
    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex((prevIndex) => prevIndex - 1);
        } else if (currentStoryIndex > 0) {
            setCurrentStoryIndex((prevIndex) => prevIndex - 1);
            const previousStoryImages = stories[currentStoryIndex - 1]?.stories?.length || 0;
            setCurrentImageIndex(previousStoryImages - 1);
        }
    };

    // Handle moving to the next story
    const handleNextStory = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex((prevIndex) => prevIndex + 1);
            setCurrentImageIndex(0);
        } else {
            onClose(); // Close when all stories are viewed
        }
    };

    // Handle screen clicks for navigation
    const handleScreenClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const screenWidth = window.innerWidth;
        const clickPosition = e.clientX;

        if (clickPosition < screenWidth / 2) {
            handlePrevImage();
        } else {
            handleNextImage();
        }
    };

    // Handle closing the story viewer
    const handleClose = () => {
        onClose();
    };

    // Prevent profile image click from triggering navigation
    const handleProfileImageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    // Handle like toggling for stories
    const handleLikeToggle = () => {
        setLiked((prevLikes) => {
            const updatedLikes = [...prevLikes];
            updatedLikes[currentStoryIndex] = !updatedLikes[currentStoryIndex];
            return updatedLikes;
        });
    };

    if (!currentStory || imageCount === 0) {
        return null;
    }

    return (
        <div className={classes.storyModal} onClick={handleScreenClick}>
            {/* Progress Bars */}
            <div className={classes.progressBars}>
                {currentStory.stories.map((_, index) => (
                    <div key={index} className={classes.progressContainer}>
                        <div
                            className={`${classes.progressSegment} ${index <= currentImageIndex ? classes.completed : ''}`}
                            style={{
                                width: index === currentImageIndex
                                    ? `${imageProgress[currentImageIndex]}%`
                                    : '0%',
                                transition: 'width 0.1s linear',
                            }}
                        ></div>
                    </div>
                ))}
            </div>

            {/* Profile Section */}
            <div className={classes.storyHeader}>
                <img
                    src={currentStory.profile_url[0]}
                    alt={`${currentStory.name} profile`}
                    className={classes.profileImage}
                    onClick={handleProfileImageClick}
                />
                <span className={classes.storyHeaderName}>{currentStory.name}</span>
            </div>

            {/* Story Image */}
            <img
                src={currentStory.stories[currentImageIndex]}
                alt={currentStory.name}
                className={classes.storyImage}
            />

            {/* Close Button */}
            <div className={classes.closeButton} onClick={handleClose}>X</div>

            {/* Like and Reply Section */}
            <div className={classes.storyBottom}>
                <div className={classes.bottomDiv}>Reply to..</div>

                <div className={classes.likeButton} onClick={handleLikeToggle}>
                    {liked[currentStoryIndex] ? (
                        <LikedIcon className={`${classes.storyLikedIcon} ${classes.liked}`} />
                    ) : (
                        <LikeIcon className={classes.storyLikeIcon} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryViewer;
