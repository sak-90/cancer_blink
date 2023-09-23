import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PriorityList.css"; // Import the CSS file

const PriorityList = () => {
  const [priorityList, setPriorityList] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5002/patient-priority")
      .then((res) => setPriorityList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="title">Patient Priority List</div>
      <div>
        Sorted in terms of highest to lowest chances of having skin cancer
      </div>
      <ul className="list" style={{ marginLeft: "40vw" }}>
        {priorityList &&
          priorityList.map((priority, index) => (
            <li key={index} className="list-item">
              Name: {priority.name} <br /> Chances of cancer:{" "}
              {priority.cancerPercentage}%
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PriorityList;
