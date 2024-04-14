import { Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { useDataContext } from "../Context/dataContext";
const BarChart = ({ chartData, userData }) => {
  const { filtersData, setClickedData } = useDataContext();
  const chartDataClicked = (event, array) => {
    console.log(event, "event");
    console.log(array, "array");
    console.log("clicked");
    const clickedValue = array[0]?.index;
    console.log(clickedValue, "clickedValue");
    const featArr = ["A", "B", "C", "D", "E", "F"];
    const featValue = featArr[clickedValue];
    console.log(featValue, "featValue");
    const featClickedArrayData = filtersData?.map((data) => {
      return data.features[featValue];
    });
    setClickedData(featClickedArrayData);
  };
  const dataClicked = () => {};
  console.log(filtersData, "filterData");
  return (
    <div className="barChart">
      <Bar
        data={chartData}
        // getElementAtEvent={(event, array) => chartDataClicked(event, array)}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          indexAxis: "y",
          onClick: chartDataClicked,
        }}
      />
    </div>
  );
};
export default BarChart;
