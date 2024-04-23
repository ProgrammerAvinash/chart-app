// import React, { useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';

// const ChartsComponent = () => {
//   // Sample data for demonstration
//   const [barChartData, setBarChartData] = useState({
//     labels: ['A', 'B', 'C', 'D', 'E'],
//     datasets: [
//       {
//         label: 'Bar Chart Data',
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         data: [12, 19, 3, 5, 2],
//       },
//     ],
//   });

//   const [lineChartData, setLineChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: 'Line Chart Data',
//         borderColor: 'rgba(75,192,192,1)',
//         borderWidth: 2,
//         data: [],
//       },
//     ],
//   });

//   // Function to handle bar click event
//   const handleBarClick = (event, array) => {
//     if (array.length > 0) {
//       const clickedIndex = array[0]._index;
//       const newData = {
//         labels: barChartData.labels,
//         datasets: [
//           {
//             label: 'Line Chart Data',
//             borderColor: 'rgba(75,192,192,1)',
//             borderWidth: 2,
//             data: barChartData.datasets[0].data.map((value, index) =>
//               index === clickedIndex ? value : null
//             ),
//           },
//         ],
//       };
//       setLineChartData(newData);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <Bar
//           data={barChartData}
//           options={{
//             responsive: true,
//             maintainAspectRatio: false,
//             onClick: handleBarClick,
//           }}
//         />
//       </div>
//       <div>
//         <Line
//           data={lineChartData}
//           options={{
//             responsive: true,
//             maintainAspectRatio: false,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChartsComponent;
import React from "react";
import { useDataContext } from "../Context/dataContext";
import { Line } from "react-chartjs-2";

export function LineChart() {
  const { lineChartData } = useDataContext();

  // Remove duplicate dates from labels
  const uniqueLabels = Array.from(new Set(lineChartData.labels));

  // Create a new data object with unique labels
  const uniqueLineChartData = {
    ...lineChartData,
    labels: uniqueLabels,
  };

  return (
    <div>
      <div>
        <Line
          data={uniqueLineChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}

export default LineChart;
