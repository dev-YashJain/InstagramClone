import React, { useRef, useEffect } from 'react';
import './reelPage.css'; // Custom styling
import LeftSide from '../components/leftSide'; // Import LeftSide component
import BottomNavBar from '../components/bottomNavBar';

// git 

const videos = [
    { id: 1, src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4', type: 'video/mp4' },
    { id: 2, src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video/mp4' },
    { id: 3, src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', type: 'video/mp4' },
];

const ReelPage: React.FC = () => {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target as HTMLVideoElement; // Cast to HTMLVideoElement
                if (entry.isIntersecting) {
                    video.muted = false; // Unmute the video when in view
                    video.play(); // Play video when in view
                } else {
                    video.muted = true; // Mute the video when out of view
                    video.pause(); // Pause video when out of view
                }
            });
        }, { threshold: 0.5 }); // Adjust threshold as needed

        // Observe each video element
        videoRefs.current.forEach(video => {
            if (video) {
                observer.observe(video);
            }
        });

        return () => {
            observer.disconnect(); // Cleanup observer on unmount
        };
    }, []);

    return (
        <div className="reelPage">
            {/* LeftSide Component */}
            <div className="left">
                <LeftSide />
            </div>

            {/* Videos Section */}
            <div className="videos">
                {videos.map((video, index) => (
                    <div key={video.id} className="videoContainer">
                        <video
                            ref={(el) => (videoRefs.current[index] = el)} // Store video element in ref
                            width="100%"
                            controls
                            loop
                            muted // Initially mute all videos
                            className="videoItem"
                        >
                            <source src={video.src} type={video.type} />
                            Your browser does not support the video tag.
                        </video>

                        {/* Action Icons */}
                        <div className="actionIcons">

                        </div>
                    </div>
                ))}
            </div>
            <BottomNavBar />
        </div>
    );
};

export default ReelPage;