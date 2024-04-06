
import { useEffect, useState } from 'react';

import './App.css';
// import AnalyticsDashboard from './Components/AnalyticsDashboard';
import BarChart from './Components/BarChart';
import { Data } from './Data';
import { useDataContext } from './Context/dataContext';
function App() {
 
  const {highValue} = useDataContext()
  // console.log(highValue,"highVAALUE")
  const featureKey = highValue.map(data=>data.feature)
  console.log(featureKey,"fear")
  const highestTimeSpent = highValue.map(data=>data.value)
  // console.log(highestTimeSpent,"highArraa") 
const userData= {
  labels:featureKey,
  datasets:[{
    label:"Total Time Spent",
    data:highestTimeSpent,
  },
]
}
  return (
    <div className="App">
      {/* <header className='App-header'>

      </header> */}
     <div>
        <BarChart chartData={userData}/>
       </div>
    </div>
  );
}


export default App;
