import React, { useState } from "react";
import { useDataContext } from "../Context/dataContext";

export const Filter = ({ convertedData }) => {
  const [selectedAge, setSelectedAge] = useState("");
  const [filteredAgeData, setFilteredAgeData] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const { setFiltersData, setFilterData } = useDataContext();
  const filterByAge = (age) => {
    if (!age == "") {
      const filtered = convertedData.filter((obj) => obj.Age === age);
      console.log(filtered, "Age Filter");
      setFiltersData(filtered);
    } else {
      setFiltersData(convertedData);
    }
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
  };

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
