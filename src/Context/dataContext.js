import { createContext, useContext, useEffect, useState } from "react";
import { Data } from "../Data";

const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [data, setData] = useState(Data);
  const [convertedData, setConvertedData] = useState();
  const [highValue, setHighValue] = useState([]);
  const [filterData, setFilterData] = useState(false);
  const [filtersData, setFiltersData] = useState(Data);
  useEffect(() => {
    console.log(filtersData, "filllll");
    const ConvertedData = data.map((data) => data);

    setConvertedData(ConvertedData);

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
  console.log(highestTimeSpent, "highArraa");
  const userData = {
    labels: featureKey,
    datasets: [
      {
        label: "Total Time Spent (Hrs)",
        data: highestTimeSpent,
      },
    ],
  };

  const filterRenderData = {
    labels: featureKey,
    datasets: [
      {
        label: "Total Time Spent (Hrs)",
        data: highestTimeSpent,
      },
    ],
  };

  return (
    <Context.Provider
      value={{
        highValue,
        userData,
        convertedData,
        filterData,
        filtersData,
        setFilterData,
        setFiltersData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("bookmarkcontext error occured");
  }
  return context;
};
