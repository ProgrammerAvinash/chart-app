import { useEffect, useState } from "react";
import { useDataContext } from "../Context/dataContext";

export const DatePicker = ({ convertedData }) => {
  const [start, setStart] = useState(new Date("2022-10-04"));
  const [end, setEnd] = useState(new Date("2022-10-31"));

  //   console.log(convertedData, "convertedData");
  const {
    setFiltersData,
    setFilterData,
    data,
    filterData,
    filtersData,
    setConvertedData,
    ogData,
  } = useDataContext();
  const filterDate = () => {
    console.log(convertedData, "convdata");
    console.log(ogData, "og");

    const filteredData = ogData?.filter((obj) => {
      const day = new Date(obj.Day);
      const startDate = start;
      const endDate = end;
      return day >= startDate && day <= endDate;
    });

    console.log(filteredData, "filter__Data");

    setFilterData(true);
    setFiltersData(filteredData);
    setConvertedData(filteredData);
    console.log(start);
  };

  return (
    <div className="dateFilterContainer">
      <label htmlFor="start">Start:</label>
      <input
        type="Date"
        min="2022-10-04"
        max="2022-10-30"
        name="start"
        id="start"
        onChange={(e) => setStart(new Date(e.target.value))}
      />
      <label htmlFor="end">End:</label>
      <input
        type="date"
        min="2022-10-05"
        max="2022-10-30"
        name="End"
        id="End"
        onChange={(e) => setEnd(new Date(e.target.value))}
      />
      <button onClick={() => filterDate()}>Filter</button>

      {!filterData ? <p>note: Please select the date range</p> : <p></p>}
    </div>
  );
};
