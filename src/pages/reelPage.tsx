import React, { useRef, useEffect } from 'react';
import './ReelPage.css'; // Custom styling
import LeftSide from '../components/LeftSide'; // Import LeftSide component
import BottomNavBar from '../components/bottomNavBar';

const videos = [
    { id: 1, src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4', type: 'video/mp4' },
    { id: 2, src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video/mp4' },
    { id: 3, src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', type: 'video/mp4' },
];

const ReelPage: React.FC = () => {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const handleScroll = () => {
        videoRefs.current.forEach((video) => {
            if (video) {
                const rect = video.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    video.play(); // Play video when fully in view
                } else {
                    video.pause(); // Pause video when out of view
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
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
                            muted
                            className="videoItem"
                        >
                            <source src={video.src} type={video.type} />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))}
            </div>
            <BottomNavBar/>
        </div>
    );
};

export default ReelPage;
