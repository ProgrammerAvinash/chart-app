
import { Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar
        data={chartData}
        
        options={{
          indexAxis: "y",
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: "x",
                speed: 10,
                threshold: 10
              },
              zoom: {
                wheel: {
                  enabled: true
                },
                pinch: {
                  enabled: true
                }
              }
            }
          }
        }}
      />
    </div>
  );
};
export default BarChart;
