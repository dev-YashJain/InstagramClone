import React from 'react';
import LeftSide from '../components/leftSide';
import MiddleSide from '../components/middleSide';
import RightSide from '../components/rightSide';
import BottomNavBar from '../components/BottomNavBar'; // Import the BottomNavBar component
import '../components/rightSide.css';

const HomePage = () => {
  return (
    <div className="App">
      <div className="leftSide">
        <LeftSide />
      </div>
      <div className="middleSide">
        <MiddleSide />
      </div>
      <div className="rightside">
        <RightSide />
      </div>
      <BottomNavBar /> {/* Add the BottomNavBar component */}
    </div>
  );
};

export default HomePage;
