import React from "react";
import calendar from "../images/calender.png";
import "../Details/Details.css";
const Details = ({ name, description, language, date, link }) => {
  return (
    <div className="cards">
      <a href={link}>
        <h1 className="language">{language}</h1>
      </a>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <div className="date-details">
        <img src={calendar} alt="" />
        <h3>{date}</h3>
      </div>
    </div>
  );
};
export default Details;
