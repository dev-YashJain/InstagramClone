import React, { useState, useEffect } from 'react';
import storyDetails from '../storyDetails.json'; // Adjust the path if necessary
import '../components/middleSide.css';
import whiteLogo from '../assets/whiteLogo.png';
import instagramLogo from '../assets/Instagram_logo.svg.png';
import NotificationIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StoryViewer from './story'; // Import StoryViewer component
import Card from './postCard'; // Import the Card component

const MiddleSide: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

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
            {storyDetails.storyDetails.map((story, postIndex) => (
                <Card
                    key={postIndex}
                    profile_url={story.profile_url}
                    name={story.name}
                />
            ))}
        </div>
    );
};

export default MiddleSide;
