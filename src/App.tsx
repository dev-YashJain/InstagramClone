import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LeftSide from './components/leftSide'
import MiddleSide from './components/middleSide'
import RightSide from './components/rightSide'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="leftSide">
        <LeftSide />
      </div>
      <div className="middleSide">
        <MiddleSide />
      </div>
      <div className="rightside">
        {/* <RightSide /> */}

      </div>
    </div>
  )
}

export default App
