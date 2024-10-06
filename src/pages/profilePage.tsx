import { FC, useEffect, useState, useContext, useRef } from 'react';
import classes from './Profilepage.module.css'; // Import the CSS Module
import LeftSide from '../components/LeftSide';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import Post from '@mui/icons-material/GridOn';
import Reels from '@mui/icons-material/SlowMotionVideo';
import Saved from '@mui/icons-material/BookmarkBorder';
import Tagged from '@mui/icons-material/AccountBox';
import postData from '../post.json'; // Import the post data
import BottomNavBar from '../components/BottomNavbar'; // Import the BottomNavBar component
import Switch from '@mui/material/Switch';
import { DarkModeContext } from '../context/DarkModeContext'; // Import the context

// Define the type for the post data
interface PostData {
    post_url: string;
}

const ProfilePage: FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext); // Consume the context
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false); // State to toggle settings menu
    const settingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch posts from post.json
        setPosts(postData.post);

        // Update window width on resize
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle clicks outside the settings menu to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setSettingsOpen(false);
            }
        };

        if (settingsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [settingsOpen]);

    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

    return (
        <div className={classes.profileSection}>
            <div className={classes.left}>
                <LeftSide />
            </div>
            <div className={classes.userProfile}>
                {/* Conditional rendering based on window width */}
                {windowWidth >= 780 ? (
                    <>
                        {/* Profile Header Section */}
                        <div className={classes.profileHeaderSection}>
                            <div className={classes.profileStart}>
                                <div className={classes.bandImage}>
                                    <img
                                        className={classes.img}
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUEFplMonL0QjS9WkOA64aIDjFXJCHf2VwMA&s"
                                        alt="bandLogo"
                                    />
                                </div>

                                <div className={classes.profileHeaderRight}>
                                    <div className={classes.profileHeader}>
                                        <p>thelucidcage</p>
                                        <button>Edit profile</button>
                                        <button>View archive</button>
                                        <button>Ad tools</button>
                                        <SettingsIcon onClick={toggleSettings} style={{ cursor: 'pointer' }} />
                                        {settingsOpen && (
                                            <div className={classes.settingsDropdown} ref={settingsRef}>
                                                <div className={classes.dropdownItem}>Settings</div>
                                                <div className={classes.dropdownItem}>
                                                    <span>Dark Mode</span>
                                                    <Switch checked={darkMode} onChange={toggleDarkMode} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={classes.profileStats}>
                                        <span>25 posts</span>
                                        <span>356 followers</span>
                                        <span>6 following</span>
                                    </div>
                                    <div className={classes.profileDescription}>
                                        <p>Lucid Cage</p>
                                        <p>Musician/band</p>
                                        <p>Can we ever reach the light?</p>
                                    </div>
                                    <div className={classes.profileContact}>
                                        <p>.</p>
                                        <p>DM for collaboration</p>
                                        <p>Email: contact.thelucidcage@gmail.com</p>
                                    </div>
                                    <div className={classes.profileInsights}>
                                        <p>26.9K accounts reached in the last 30 days.</p>
                                        <p>View insights</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Highlights Section */}
                        <div className={classes.highlights}>
                            <div className={classes.highlight}>
                                <img
                                    src="https://cdn.media.amplience.net/i/metallica/ride-the-lightning_cover"
                                    alt=""
                                />
                                <p>Performances</p>
                            </div>
                            <div className={classes.highlight}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSS4gnm19AXOWtl3TOi8-Vt0R8EHF2Aa0G2Q&s"
                                    alt=""
                                />
                                <p>BandMates</p>
                            </div>
                            <div className={classes.highlight}>
                                <AddIcon style={{ fontSize: 85 }} />
                                <p>New</p>
                            </div>
                        </div>

                        {/* Posts Section */}
                        <div className={classes.postsSection}>
                            <div className={classes.navigator}>
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
                            <div className={classes.postsGrid}>
                                {posts.map((post, index) => (
                                    <img
                                        key={index}
                                        src={post.post_url}
                                        alt={`Post ${index}`}
                                        className={classes.postImg}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Mobile View Profile Page */}
                        <div className={classes.proPage}>
                            <div className={classes.topNav}>
                                <SettingsIcon onClick={toggleSettings} style={{ cursor: 'pointer' }} />
                                <p>thelucidcage</p>
                                <p>@</p>
                                {settingsOpen && (
                                    <div className={classes.settingsDropdown} ref={settingsRef}>
                                        <div className={classes.dropdownItem}>Settings</div>
                                        <div className={classes.dropdownItem}>
                                            <span>Dark Mode</span>
                                            <Switch checked={darkMode} onChange={toggleDarkMode} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={classes.div2}>
                                <p>thelucidcage</p>
                                <SettingsIcon onClick={toggleSettings} style={{ cursor: 'pointer' }} />
                            </div>

                            <div className={classes.div3}>
                                <button className={classes.btn1}>Edit Profile</button>
                                <button className={classes.btn2}>View Archive</button>
                            </div>

                            <div className={classes.div4}>
                                <div className={classes.div5}>
                                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUEFplMonL0QjS9WkOA64aIDjFXJCHf2VwMA&s"} alt="bandImage" />
                                </div>
                                <div className={classes.div6}>
                                    <button>Ad Tools</button>
                                    <p>26.9K accounts reached in the last 30  <br /> View insights</p>
                                </div>
                            </div>

                            <div className={classes.div7}>
                                <div className={classes.profileDescription}>
                                    <p>Lucid Cage <br />Musician/band <br />Can we ever reach the light?</p>
                                </div>
                                <div className={classes.profileContact}>
                                    <p>. <br /> DM for collaboration <br />Email: contact.thelucidcage@gmail.com</p>
                                </div>
                            </div>

                            <div className={classes.div8}>
                                <div className={classes.highlights}>
                                    <div className={classes.highlight}>
                                        <img
                                            src="https://cdn.media.amplience.net/i/metallica/ride-the-lightning_cover"
                                            alt=""
                                        />
                                        <p>Perf!</p>
                                    </div>
                                    <div className={classes.highlight}>
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSS4gnm19AXOWtl3TOi8-Vt0R8EHF2Aa0G2Q&s"
                                            alt=""
                                        />
                                        <p>BM!</p>
                                    </div>
                                    <div className={classes.highlight}>
                                        <AddIcon style={{ fontSize: 50 }} />
                                        <p>New</p>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.postsSection}>
                                {posts.map((post, index) => (
                                    <img
                                        key={index}
                                        src={post.post_url}
                                        alt={`Post ${index}`}
                                        className={classes.postImg}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <BottomNavBar /> 
        </div>
    );
};

export default ProfilePage;
