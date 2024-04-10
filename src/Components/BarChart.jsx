import { Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
const BarChart = ({ chartData, userData, filterData, filtersData }) => {
  const chartDataClicked = (event, array) => {
    console.log(event, "event");
    console.log(array, "array");
    console.log("clicked");
  };
  return (
    <div className="barChart">
      <Bar
        data={chartData}
        // getElementAtEvent={(event, array) => chartDataClicked(event, array)}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          indexAxis: "y",
          width: 100,
          height: 500,
          onClick: chartDataClicked,
        }}
      />
    </div>
  );
};
export default BarChart;
