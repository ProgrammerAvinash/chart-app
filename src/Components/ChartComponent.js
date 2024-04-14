import { useDataContext } from "../Context/dataContext";
import BarChart from "./BarChart";
import { DatePicker } from "./DatePicker";
import { Filter } from "./Filter";
import LineChart from "./LineChart";
export function ChartComponent() {
  const { highValue, userData, convertedData, filtersData } = useDataContext();

  return (
    <div>
      <div className="datePicker">
        <DatePicker convertedData={convertedData} />

        <Filter convertedData={convertedData} />
      </div>
      <BarChart chartData={userData} filtersData={filtersData} />
      <LineChart />
    </div>
  );
}

export default ChartComponent;
