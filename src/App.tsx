import './App.css'
import LeftSide from './components/leftSide'
import MiddleSide from './components/middleSide'
import RightSide from './components/rightSide'

function App() {
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
    </div>
  )
}

export default App
