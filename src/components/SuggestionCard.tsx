import { FC } from 'react';
import classes from '../components/RightSide.module.css';

interface SuggestionCardProps {
    imageSrc: string;
    name: string;
    buttonLabel: string;
}

const SuggestionCard: FC<SuggestionCardProps> = ({ imageSrc, name, buttonLabel }) => {
    return (
        <div className={classes.rightSideHome}>
            <div className={classes.profileImage}>
                <img src={imageSrc} alt={`${name}'s profile`} />
            </div>
            <div className={classes.texts}>
                <div className={classes.text1}>{name}</div>
                <div className={classes.text2}>{name.split(' ')[0]}</div>
            </div>
            <div className={classes.buttons}>
                {buttonLabel}
            </div>
        </div>
    );
};

export default SuggestionCard;