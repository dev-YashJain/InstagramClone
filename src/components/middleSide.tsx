import { FC, useState, useEffect, useMemo } from 'react';
import storyDetailsData from '../storyDetails.json'; // Assuming the structure is known
import classes from '../components/MiddleSide.module.css';
import whiteLogo from '../assets/whiteLogo.png';
import instagramLogo from '../assets/Instagram_logo.svg.png';
import NotificationIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StoryViewer from './Story';
import Card from './Postcard';


const LOCAL_STORAGE_KEY = 'darkMode'; // Avoid hardcoding the local storage key

const MiddleSide: FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const savedMode = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedMode === 'true';
    });

    const [isStoryOpen, setIsStoryOpen] = useState<boolean>(false);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(0);

    useEffect(() => {
        const handleStorageChange = () => {
            const savedMode = localStorage.getItem(LOCAL_STORAGE_KEY);
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

    // Memoized value for logo selection
    const logo = useMemo(() => (darkMode ? whiteLogo : instagramLogo), [darkMode]);

    const openStory = (index: number) => {
        const story = storyDetailsData.storyDetails[index];
        if (story?.stories?.length > 0) {
            setSelectedStoryIndex(index);
            setIsStoryOpen(true);
        } else {
            console.log("No stories available for this user.");
        }
    };

    const closeStory = () => {
        setIsStoryOpen(false);
    };

    return (
        <div className={classes.middleSidePart}>
            <div className={classes.topLogo}>
                <div><img className={classes.instaImg} src={logo} alt="Instagram" /></div>
                <div><NotificationIcon /></div>
            </div>

            {/* Story Block */}
            <div className={classes.storyBlock}>
                {storyDetailsData.storyDetails.map((story, index) => (
                    <div
                        className={classes.storyParticular}
                        key={index}
                        onClick={() => openStory(index)}
                    >
                        <div className={classes.imageDiv}>
                            <img
                                className={classes.statusImg}
                                src={story?.profile_url?.[0] || "https://via.placeholder.com/150"}
                                alt={story?.name}
                            />
                        </div>
                        <div className={classes.profileName}>
                            {story?.name.length > 9 ? `${story.name.substring(0, 9)}...` : story.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Story Viewer Modal */}
            {isStoryOpen && (
                <StoryViewer
                    stories={storyDetailsData.storyDetails}
                    initialIndex={selectedStoryIndex}
                    onClose={closeStory}
                />
            )}

            {/* Post Section */}
            {storyDetailsData.storyDetails.map((story, postIndex) => (
                <Card
                    key={postIndex}
                    profile_url={story?.profile_url}
                    name={story?.name}
                />
            ))}
        </div>
    );
};

export default MiddleSide;
