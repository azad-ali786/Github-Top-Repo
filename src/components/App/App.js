import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../App/App.css";
import Details from "../Details/Details";
function App() {
  //Months
  const getCurrentMonth = () => {
    const month = new Date().getMonth();
    if (month < 10) {
      return `0${month}`;
    } else {
      return month;
    }
  };

  //Current data
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
  if (isFetched) {
  }
  return (
    <>
    <div className={"slider" + (isFetched ? "fade" : "")}>
      <div className="loader">
        <div className="load"></div>
      </div>
      </div>
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
        />{" "}
      </nav>

      <motion.section>
        {isFetched &&
          filteredData.map((data) => (
            <Details
              id={data.id}
              key={data.id}
              name={data.name}
              language={data.language}
              description={data.description}
              date={new Date(data.created_at).toUTCString()}
              link={data.clone_url}
            />
          ))}
      </motion.section>
    </>
  );
}

export default App;
