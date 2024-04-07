import { createContext, useContext, useEffect, useState } from "react";
import { Data } from "../Data";

const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [highValue, setHighValue] = useState([]);

  useEffect(() => {
    const totalTimes = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
    };

    Data.forEach((item) => {
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

    console.log(highestValuesArray2, "ttd");

    setHighValue(highestValuesArray2);
  }, []);
  console.log(highValue, "high");

  ///////////////////////////

  return <Context.Provider value={{ highValue }}>{children}</Context.Provider>;
};

export const useDataContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("bookmarkcontext error occured");
  }
  return context;
};
