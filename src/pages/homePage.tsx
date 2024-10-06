import LeftSide from '../components/LeftSide.js';
import MiddleSide from '../components/MiddleSide.js';
import RightSide from '../components/RightSide.js';
import BottomNavBar from '../components/BottomNavbar.js'; // Import the BottomNavBar component
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
