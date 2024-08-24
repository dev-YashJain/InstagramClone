import storyDetails from '../storyDetails.json'; // Adjust the path if necessary
import '../components/middleSide.css';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareIcon from '@mui/icons-material/IosShareRounded';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderRounded';

const MiddleSide = () => {
    return (
        <div className='middleSidePart'>
            <div className="storyBlock">
                {storyDetails.storyDetails.map((story, index) => (
                    <div className="storyParticular" key={index}>
                        <div className="imageDiv">
                            <img className="statusImg" src={story.profile_url || "https://via.placeholder.com/150"} alt={story.name} />
                        </div>
                        <div className="profileName">
                            {story.name.length > 9 ? `${story.name.substring(0, 9)}...` : story.name}
                        </div>
                    </div>
                ))}
            </div>

            {storyDetails.storyDetails.map((story, index) => (
                <div className="postSection" key={index}>
                    <div className="post">
                        <div className="postHeader">
                            <div className="profilePhoto"> <img src={story.profile_url} alt="vgv" /></div>
                            <div className="profileName">{story.name}</div>
                            <div className="blueTick">
                                <CheckCircleOutlineOutlinedIcon style={{ color: 'blue', fontSize: '18px' }} />
                            </div>
                            <div className="time">.3w.</div>
                            <div className="info">
                                <MoreHorizOutlinedIcon style={{ fontSize: '18px' }} />
                            </div>
                        </div>

                        <div className="postImage">
                            <div > <img src={story.profile_url} alt="vgv" /></div>
                        </div>

                        <div className="postFooter">
                            <div className="footerIcons">
                                <LikeIcon className='icon' />
                                <CommentIcon className='icon' />
                                <ShareIcon className='icon' />
                                <BookmarkIcon className='bookmark' />
                            </div>
                            <div className="footerLikes">
                                68, 321 likes
                            </div>
                            <div className="footerCaption">

                                <div className="footerProfileName" >Tom Hanks</div>

                                <div className="captionText">Strings is all you need.</div>
                            </div>
                            <div className="viewComment">
                                View all 681 comments
                            </div>
                            <div className="addComment">
                                Add a comment...
                            </div>
                        </div>
                        <hr className="postSeparator" />
                    </div>
                </div>
            ))}


        </div>

    );
}

export default MiddleSide;
