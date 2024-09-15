import React, { useEffect, useState } from 'react';
import './profilePage.css';
import LeftSide from '../components/leftSide';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import Post from '@mui/icons-material/GridOn';
import Reels from '@mui/icons-material/SlowMotionVideo';
import Saved from '@mui/icons-material/BookmarkBorder';
import Tagged from '@mui/icons-material/AccountBox';
import postData from '../post.json'; // Import the post data
import BottomNavBar from '../components/bottomNavBar'; // Import the BottomNavBar component

// Define the type for the post data
interface PostData {
    post_url: string;
}

const ProfilePage: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        // Fetch posts from post.json
        setPosts(postData.post);
    }, []);

    return (
        <div className="profileSection">
            <div className="left">
                <LeftSide />
            </div>
            <div className="userProfile">
                {/* Profile Header Section */}
                <div className="profileSection">
                    <div className="profileStart">
                        <div className="bandImage">
                            <img
                                className="img"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUEFplMonL0QjS9WkOA64aIDjFXJCHf2VwMA&s"
                                alt="bandLogo"
                            />
                        </div>

                        <div className="profileHeaderRight">
                            <div className="profileHeader">
                                <p>thelucidcage</p>
                                <button>Edit profile</button>
                                <button>View archive</button>
                                <button>Ad tools</button>
                                <SettingsIcon />
                            </div>
                            <div className="profileStats">
                                <span>25 posts</span>
                                <span>356 followers</span>
                                <span>6 following</span>
                            </div>
                            <div className="profileDescription">
                                <p>Lucid Cage</p>
                                <p>Musician/band</p>
                                <p>Can we ever reach the light?</p>
                            </div>
                            <div className="profileContact">
                                <p>.</p>
                                <p>DM for collaboration</p>
                                <p>Email: contact.thelucidcage@gmail.com</p>
                            </div>
                            <div className="profileInsights">
                                <p>26.9K accounts reached in the last 30 days. View insights</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Highlights Section */}
                <div className="highlights">
                    <div className="highlight">
                        <img
                            src="https://cdn.media.amplience.net/i/metallica/ride-the-lightning_cover"
                            alt=""
                        />
                        <p>Performances</p>
                    </div>
                    <div className="highlight">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSS4gnm19AXOWtl3TOi8-Vt0R8EHF2Aa0G2Q&s"
                            alt=""
                        />
                        <p>BandMates</p>
                    </div>
                    <div className="highlight">
                        <AddIcon style={{ fontSize: 85 }} />
                        <p>New</p>
                    </div>
                </div>

                {/* Posts Section */}
                <div className="postsSection">
                    <div className="navigator">
                        <div>
                            <Post />
                            POSTS
                        </div>
                        <div>
                            <Reels />
                            REELS
                        </div>
                        <div>
                            <Saved />
                            SAVED
                        </div>
                        <div>
                            <Tagged />
                            TAGGED
                        </div>
                    </div>
                    <div className="postsGrid">
                        {posts.map((post, index) => (
                            <img
                                key={index}
                                src={post.post_url}
                                alt={`Post ${index}`}
                                className="postImg"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <BottomNavBar /> {/* Add the BottomNavBar component */}
        </div>
    );
};

export default ProfilePage;
