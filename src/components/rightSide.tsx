import {FC} from 'react';
import classes from '../components/RightSide.module.css';
import SuggestionCard from './SuggestionCard';

const RightSide: FC = () => {
    const imageSrc = "https://assets.vogue.in/photos/601bfddd3514c40d2b37e596/2:3/w_2560%2Cc_limit/jacqueline%2520fernandez%2520makeup%2520skincare.jpg";
    const name = "Jacqueline Fernandez";

    return (
        <div className={classes.parentContainer}>
            <SuggestionCard imageSrc={imageSrc} name={name} buttonLabel="Switch" />
            <div className={classes.separatorText}>
                <div className={classes.text1}>Suggested for you</div>
                <div className={classes.text2} style={{ color: 'black' }}>See all</div>
            </div>
            {Array.from({ length: 4 }, (_, index) => (
                <SuggestionCard key={index} imageSrc={imageSrc} name={name} buttonLabel="Follow" />
            ))}
        </div>
    );
}

export default RightSide;