import React, { useEffect, useState } from "react";
import { useDataContext } from "../Context/dataContext";

export const Filter = ({ convertedData }) => {
  const [selectedAge, setSelectedAge] = useState("");
  const [filteredAgeData, setFilteredAgeData] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const { setFiltersData, setFilterData, filtersData, filterData } =
    useDataContext();

  // Function to get cookie

  const getCookie = (name) => {
    const nameEQ = name + "=";

    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];

      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }

      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }

    return null;
  };

  // Function to set cookie

  const setCookie = (name, value, days = 30) => {
    const date = new Date();

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    const expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const filterByAge = (age) => {
    if (!age == "") {
      const filtered = convertedData?.filter((obj) => obj.Age === age);
      console.log(filtered, "Age Filter");
      setFiltersData(filtered);
    } else {
      setFiltersData(convertedData);
    }
    setCookie("selectedAge", age);
  };
  const filterByGender = (gender) => {
    if (!gender == "") {
      const filteredGender = convertedData.filter(
        (obj) => obj.Gender === gender
      );
      console.log(filteredGender, "gender Filter");
      setFiltersData(filteredGender);
    } else {
      setFiltersData(convertedData);
    }
    setCookie("selectedGender", gender);
  };
  useEffect(() => {
    const savedSelectedAge = getCookie("selectedAge");
    const savedSelectedGender = getCookie("selectedGender");
    setSelectedAge(savedSelectedAge || "");
    setSelectedGender(savedSelectedGender || "");

    filterByAge(savedSelectedAge);
    filterByGender(savedSelectedGender);
  }, []);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAge(selectedValue);
    filterByAge(selectedValue);
  };

  const handleGenderSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedGender(selectedValue);
    filterByGender(selectedValue);
  };
  return (
    <div className="filterContainer">
      <label>
        Age
        <select
          id="ageFilter"
          value={selectedAge}
          onChange={handleSelectChange}
        >
          <option value="">All Ages</option>
          <option value=">25">Age {">"} 25</option>
          <option value="15-25">Age 15-25</option>
        </select>
      </label>
      <label htmlFor="genderFilter">Select Gender:</label>
      <select
        id="genderFilter"
        value={selectedGender}
        onChange={handleGenderSelectChange}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  );
};
