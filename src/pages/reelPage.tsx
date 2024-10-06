import { FC, useRef, useEffect, useContext, useState } from 'react';
import styles from './ReelPage.module.css'; // Updated to CSS Module
import LeftSide from '../components/LeftSide'; // Import LeftSide component
import BottomNavBar from '../components/BottomNavbar';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareIcon from '@mui/icons-material/IosShareOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MoreIcon from '@mui/icons-material/MoreHorizOutlined';
import LikedIcon from '@mui/icons-material/Favorite'; // Import the filled like icon
import { DarkModeContext } from '../context/DarkModeContext'; // Import Dark Mode Context

const videos = [
    { id: 1, src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4', type: 'video/mp4' },
    { id: 2, src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video/mp4' },
    { id: 3, src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', type: 'video/mp4' },
];

const ReelPage: FC = () => {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [liked, setLiked] = useState<boolean>(false);
    // Access darkMode from context
    const { darkMode } = useContext(DarkModeContext);

    const toggleLike = () => {
        setLiked((prevLiked) => !prevLiked); // Toggle like state
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target as HTMLVideoElement;
                if (entry.isIntersecting) {
                    video.play(); // Play video when in view
                } else {
                    video.pause(); // Pause video when out of view
                }
            });
        }, { threshold: 0.5 });

        videoRefs.current.forEach(video => {
            if (video) {
                observer.observe(video);
            }
        });

        return () => {
            observer.disconnect(); // Cleanup observer on unmount
        };
    }, []);

    const handleVideoClick = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            video.muted = !video.muted; // Toggle mute/unmute on click
        }
    };

    return (
        <div className={`${styles.reelPage} ${darkMode ? styles.dark : styles.light}`}>
            <div className={styles.left}>
                <LeftSide />
            </div>

            <div className={styles.videos}>
                {videos.map((video, index) => (
                    <div key={video.id} className={styles.videoContainer}>
                        <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            width="100%"
                            loop
                            muted
                            className={styles.videoItem}
                            onClick={() => handleVideoClick(index)}
                        >
                            <source src={video.src} type={video.type} />
                            Your browser does not support the video tag.
                        </video>

                        <div className={styles.videoIcons}>
                            <div className={styles.likeDetails}>
                                {liked ? (
                                    <LikedIcon className={styles.icon} style={{ color: 'red' }} onClick={toggleLike} />
                                ) : (
                                    <LikeIcon className={styles.icon} onClick={toggleLike} />
                                )}
                                <p>48.1K</p>
                            </div>
                            <div className={styles.commentDetails}>
                                <CommentIcon />
                                <p>84</p>
                            </div>
                            <div>
                                <ShareIcon />
                            </div>
                            <div>
                                <BookmarkIcon />
                            </div>
                            <div>
                                <MoreIcon />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <BottomNavBar />
        </div>
    );
};

export default ReelPage;
