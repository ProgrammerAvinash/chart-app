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
  console.log(data, "data");
  // const [data, setData] = useState([]);
  console.log(convertedData, "convertedData");
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const ConvertedData = data?.map((data) => data);

    setConvertedData(ConvertedData);
  }, [data]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://5036cd2e-7e40-4c7a-8f92-8541ac4c953c-00-oh7b222l4zlv.pike.replit.dev/data"
      );
      console.log(response, "response");
      if (!response.status === 200) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
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
