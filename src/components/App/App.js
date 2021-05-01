import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import '../App/App.css';
function App() {
  const getCurrentMonth = () => {
    const month = new Date().getMonth();
    if (month < 10) {
      return `0${month}`;
    } else {
      return month;
    }
  };
  const getCurrentDay = () => {
    const day = new Date().getDate();
    if (day < 10) {
      return `0${day}`;
    } else {
      return day;
    }
  };
  // Date vars
  const currentYear = new Date().getFullYear();
  const currentMonth = getCurrentMonth();
  const currentDay = getCurrentDay();
  const lastWeek = `${currentYear}-${currentMonth}-${currentDay}`;
  //For setting data from api
  const [data, setData] = useState({});
  //Filter data
  const [filteredData, setFilteredData] = useState(data);
  //Checking if the data is fetched from api or not
  const [isFetched, setIsFetched] = useState(false);
  //Fetching Api
  useEffect(() => {
    axios
      .get(
        `https://api.github.com/search/repositories?q=created:%22%3E${lastWeek}%22&sort=stars&order=desc`
      )
      .then((data) => {
        setData(data.data.items);
        setFilteredData(data.data.items);
        // console.log(data.data.items);
        setIsFetched(true);
      })
      .catch((e) => console.log(e));
  }, []);
  //submitHandler
  const handleSearch = (event) => {
    if (event.target.value !== "") {
      const result = data.filter((res) => {
        return Object.values(res)
          .join(" ")
          .toLowerCase()
          .includes(event.target.value);
      });
      setFilteredData(result);
    } else {
      setFilteredData(data);
    }
  };
  console.log(filteredData);

  return (
    <>
      <nav>
        {" "}
        <h1>Github Trending Repository</h1>
        <label for="search">Search:</label>
        <input
          id="search"
          name="search"
          placeholder="Search Language"
          type="text"
          onChange={(event) => handleSearch(event)}
        />
        {" "}
      </nav>
     
      <motion.section>
        {isFetched && (
          <motion.div className="App">
            {" "}
            <h1>{filteredData[0].language}</h1>
          </motion.div>
        )}
      </motion.section>
    </>
  );
}

export default App;
