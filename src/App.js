import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Components/Home";
import ChartComponent from "./Components/ChartComponent";
import { RequiresAuth } from "./Components/Auth/RequiresAuth";
import { Navbar } from "./Components/Navbar";
import { useDataContext } from "./Context/dataContext";
import { Login } from "./Components/Login";
import { SignUp } from "./Components/Signup";

function App() {
  const { highValue, userData, convertedData, filtersData, filterData } =
    useDataContext();
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/chart"
          element={
            <RequiresAuth>
              <ChartComponent />
            </RequiresAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
