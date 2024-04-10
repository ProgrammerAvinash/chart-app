import { useDataContext } from "../Context/dataContext";
import BarChart from "./BarChart";
import { DatePicker } from "./DatePicker";
import { Filter } from "./Filter";
export function ChartComponent() {
  const { highValue, userData, convertedData, filtersData } = useDataContext();

  return (
    <div>
      <div className="datePicker">
        <DatePicker convertedData={convertedData} />
      </div>
      <BarChart chartData={userData} filtersData={filtersData} />
      <div>
        <Filter convertedData={convertedData} />
      </div>
    </div>
  );
}

export default ChartComponent;
