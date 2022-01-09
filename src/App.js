import './App.css';
import Loading from './Component/Loading/Loading'
import Sidenav from './Component/Sidenav/Sidenav';
import Cards from './Component/Cards/Cards';
import { useState } from "react";

function App() {
  const [grid,setGrid] = useState(false)
  return (
    <div className="w-100 row bg-lite-green ">
        <Sidenav grid={grid} setGrid={setGrid}/>
        <div className="col-md-3"></div>
      <div className="col-md-9 mr-n">
        {/* <Loading/> */}
        <Cards grid={grid} setGrid={setGrid}/>
      </div>
    </div>
  );
}

export default App;
