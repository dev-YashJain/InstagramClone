import React, { useState, useRef, useEffect } from 'react';
import './reelPage.css'; // Custom styling
import LeftSide from '../components/leftSide'; // Import LeftSide component
import BottomNavBar from '../components/bottomNavBar';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareIcon from '@mui/icons-material/IosShareOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MoreIcon from '@mui/icons-material/MoreHorizOutlined';

const videos = [
    { id: 1, src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4', type: 'video/mp4' },
    { id: 2, src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video/mp4' },
    { id: 3, src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', type: 'video/mp4' },
];

const ReelPage: React.FC = () => {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    
    // Initialize darkMode from localStorage
    const [darkMode] = useState<boolean>(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true'; // Retrieve saved mode from localStorage
    });

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
        <div className={`reelPage ${darkMode ? 'dark' : 'light'}`}>
            <div className="left">
                <LeftSide />
            </div>

            <div className="videos">
                {videos.map((video, index) => (
                    <div key={video.id} className="videoContainer">
                        <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            width="100%"
                            loop
                            muted
                            className="videoItem"
                            onClick={() => handleVideoClick(index)}
                        >
                            <source src={video.src} type={video.type} />
                            Your browser does not support the video tag.
                        </video>

                        <div className="videoIcons">
                            <div className="likeDetails">
                                <LikeIcon />
                                <p>48.1K</p>
                            </div>
                            <div className="commentDetails">
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
