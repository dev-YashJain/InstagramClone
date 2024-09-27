import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/story.css';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';

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

const StoryViewer: React.FC<StoryProps> = ({ stories, initialIndex, onClose }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(initialIndex);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageProgress, setImageProgress] = useState<number[]>(new Array(stories[initialIndex]?.stories.length).fill(0));
    const navigate = useNavigate();

    const currentStory = stories[currentStoryIndex];
    const imageCount = currentStory?.stories?.length || 0;

    useEffect(() => {
        if (!currentStory || imageCount === 0) {
            navigate('/');
        }
    }, [currentStory, imageCount, navigate]);

    // Set the progress of the current image
    useEffect(() => {
        const interval = setInterval(() => {
            setImageProgress((prevProgress) => {
                const updatedProgress = [...prevProgress];
                if (updatedProgress[currentImageIndex] < 100) {
                    updatedProgress[currentImageIndex] += (100 / 30); // Increase 3.33% every 100ms to complete in 3 seconds
                }
                return updatedProgress;
            });
        }, 100); // Increase progress every 100ms

        if (imageProgress[currentImageIndex] >= 100) {
            handleNextImage();
        }

        return () => clearInterval(interval);
    }, [imageProgress, currentImageIndex]);

    // Reset progress when changing image
    useEffect(() => {
        setImageProgress(new Array(imageCount).fill(0)); // Reset progress for new story
    }, [currentImageIndex, currentStoryIndex, imageCount]);

    // Move to the next image or story
    const handleNextImage = () => {
        if (currentImageIndex < imageCount - 1) {
            setCurrentImageIndex((prevIndex) => prevIndex + 1);
        } else {
            handleNextStory();
        }
    };

    // Move to the previous image or story
    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex((prevIndex) => prevIndex - 1);
        } else if (currentStoryIndex > 0) {
            setCurrentStoryIndex((prevIndex) => prevIndex - 1);
            const previousStoryImages = stories[currentStoryIndex - 1]?.stories?.length || 0;
            setCurrentImageIndex(previousStoryImages - 1);
        }
    };

    // Move to the next story
    const handleNextStory = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex((prevIndex) => prevIndex + 1);
            setCurrentImageIndex(0);
        } else {
            onClose(); // Close viewer if it's the last story
        }
    };

    // Handle click on screen (left or right half)
    const handleScreenClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const screenWidth = window.innerWidth;
        const clickPosition = e.clientX;

        if (clickPosition < screenWidth / 2) {
            handlePrevImage(); // Left half, go to the previous image
        } else {
            handleNextImage(); // Right half, go to the next image
        }
    };

    // Close the story viewer
    const handleClose = () => {
        onClose();
    };

    // Do nothing if profile image clicked
    const handleProfileImageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation(); // Prevent further action
    };

    if (!currentStory || imageCount === 0) {
        return null;
    }

    return (
        <div className="storyModal" onClick={handleScreenClick}>
            {/* Progress Bars */}
            <div className="progressBars">
                {currentStory.stories.map((_, index) => (
                    <div key={index} className="progressContainer">
                        <div
                            className={`progressSegment ${index <= currentImageIndex ? 'completed' : ''}`}
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
            <div className="storyHeader">
                <img
                    src={currentStory.profile_url[0]}
                    alt={`${currentStory.name} profile`}
                    className="profileImage"
                    onClick={handleProfileImageClick} // Do nothing when clicked
                />
                <span className="storyHeaderName">{currentStory.name}</span>
            </div>

            {/* Story Image */}
            <img
                src={currentStory.stories[currentImageIndex]}
                alt={currentStory.name}
                className="storyImage"
            />

            {/* Close Button */}
            <div className="closeButton" onClick={handleClose}>X</div>
            <div className="storyBottom">
                <div className="bottomDiv">
                    Reply to..
                </div>
                <LikeIcon className='storyLikeIcon' />
            </div>
        </div>
    );
};

export default StoryViewer;