import { createContext, useContext, useEffect, useState } from "react";
import { Data } from "../Data";

const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [data, setData] = useState();
  const [convertedData, setConvertedData] = useState([]);
  const [highValue, setHighValue] = useState([]);
  const [filterData, setFilterData] = useState(false);
  const [filtersData, setFiltersData] = useState(data);
  const [clickedData, setClickedData] = useState();
  const [ogData, setOgData] = useState();
  console.log(data, "data");
  // const [data, setData] = useState([]);

  console.log(convertedData, "convertedData");

  // Function to set a cookie

  function setCookie(name, value, days) {
    var expires = "";

    if (days) {
      var date = new Date();

      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Function to get a cookie

  function getCookie(name) {
    var nameEQ = name + "=";

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];

      while (cookie.charAt(0) == " ") {
        cookie = cookie.substring(1, cookie.length);
      }

      if (cookie.indexOf(nameEQ) == 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }

    return null;
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://chart-app-server.vercel.app/data");
      console.log(response, "response");
      if (!response.status === 200) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      // const savedFiltersData = JSON.parse(getCookie("filtersData")) || jsonData;
      setFiltersData(jsonData);
      setConvertedData(jsonData);
      // setFiltersData(jsonData);
      setOgData(jsonData);
      // setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const totalTimes = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
    };
    //Total Time spent
    filtersData?.forEach((item) => {
      Object.keys(totalTimes).forEach((feature) => {
        totalTimes[feature] += parseInt(item.features[feature]);
      });
    });

    Object.keys(totalTimes).forEach((feature) => {
      totalTimes[feature] = Math.round(totalTimes[feature] / 60);
    });

    const highestValuesArray2 = Object.entries(totalTimes).map(
      ([feature, value]) => ({
        feature,
        value,
      })
    );

    setHighValue(highestValuesArray2);
  }, [filtersData]);

  const featureKey = highValue.map((data) => data.feature);

  const highestTimeSpent = highValue.map((data) => data.value);

  console.log(clickedData, "CLickedData");
  const userData = {
    labels: featureKey,
    datasets: [
      {
        label: "Total Time Spent (Hrs)",
        data: highestTimeSpent,
      },
    ],
  };
  const Date = filtersData?.map((data) => data.Day);
  const lineChartData = {
    labels: Date,
    datasets: [
      {
        label: "Feature Data",
        data: clickedData,
      },
    ],
  };

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        highValue,
        userData,
        convertedData,
        filterData,
        filtersData,
        setFilterData,
        setFiltersData,
        setClickedData,
        lineChartData,
        setConvertedData,
        ogData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(" error occured");
  }
  return context;
};
