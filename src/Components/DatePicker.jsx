import { useEffect, useState } from "react";
import { useDataContext } from "../Context/dataContext";

export const DatePicker = ({ convertedData }) => {
  const [start, setStart] = useState(new Date("2022-10-04"));
  const [end, setEnd] = useState(new Date("2022-10-31"));

  //   console.log(convertedData, "convertedData");
  const deleteCookie = (name) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  const {
    setFiltersData,
    setFilterData,
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
      console.log(startDate, "SD");
      const endDate = end;
      return day >= startDate && day <= endDate;
    });

    console.log(filteredData, "filter__Data");

    setFilterData(true);
    setFiltersData(filteredData);
    setConvertedData(filteredData);
    console.log(start);
  };

  const resetPreferences = () => {
    deleteCookie("startDate");
    deleteCookie("endDate");

    setStart(new Date("2022-10-04"));
    setEnd(new Date("2022-10-31"));

    filterDate();
  };
  const generateShareURL = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("start", start.toISOString().split("T")[0]);
    queryParams.set("end", end.toISOString().split("T")[0]);
    const shareURL = `${window.location.origin}${
      window.location.pathname
    }?${queryParams.toString()}`;
    navigator.clipboard.writeText(shareURL);
    alert("URL copied to clipboard!");
  };

  return (
    <div className="dateFilterContainer">
      <div>
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
      </div>
      <div className="buttonClass">
        <button onClick={() => filterDate()}>Filter</button>

        {/* {!filterData ? <p>note: Please select the date range</p> : <p></p>} */}

        <button className="share" onClick={generateShareURL}>
          Share
        </button>
        <button className="reset" onClick={() => resetPreferences()}>
          Reset
        </button>
      </div>
    </div>
  );
};
