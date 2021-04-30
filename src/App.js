import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

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
  //Checking if the data is fetched from api or not 
  const [isFetched,setIsFetched] = useState(false);
 // For filtering by language
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/search/repositories?q=created:%22%3E${lastWeek}%22&sort=stars&order=desc`
      )
      .then((data) => {
        setData(data.data.items);
        console.log(data.data.items);
        setIsFetched(true);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
  <>
  {isFetched && ( <div className="App"> <h1>{data[0].language}</h1></div>)}
  </>
  );
}

export default App;
