import LeftSide from '../components/LeftSide';
import MiddleSide from '../components/MiddleSide';
import RightSide from '../components/RightSide';
import BottomNavBar from '../components/BottomNavbar'; // Import the BottomNavBar component
import styles from './HomePage.module.css'; // Updated import for CSS Module

const HomePage = () => {
  return (
    <div className={styles.App}>
      <div className={styles.leftSide}>
        <LeftSide />
      </div>
      <div className={styles.middleSide}>
        <MiddleSide />
      </div>
      <div className={styles.rightSide}>
        <RightSide />
      </div>
      <BottomNavBar /> {/* Add the BottomNavBar component */}
    </div>
  );
};

export default HomePage;
