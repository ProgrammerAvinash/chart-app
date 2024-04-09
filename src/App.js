import { useEffect, useState } from "react";

import "./App.css";
import BarChart from "./Components/BarChart";
import { useDataContext } from "./Context/dataContext";
import { DatePicker } from "./Components/DatePicker";
import { Filter } from "./Components/Filter";

function App() {
  const { highValue, userData, convertedData, filtersData } = useDataContext();

  return (
    <div className="App">
      <div>
        <DatePicker convertedData={convertedData} />
      </div>
      <div className="chartContainer">
        <BarChart chartData={userData} filtersData={filtersData} />
        <div>
          <Filter convertedData={convertedData} />
        </div>
      </div>
    </div>
  );
}

export default App;
