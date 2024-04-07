import { Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: true,
          responsive: true,
          indexAxis: "y",
          width: 100,
          height: 300,
        }}
      />
    </div>
  );
};
export default BarChart;
