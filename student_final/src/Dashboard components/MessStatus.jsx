// MessStatus.js
import React, { useState, useEffect } from "react";
import "./MessStatus.css";
import TimeDisplay from "./TimeDisplay";

const MessStatus = () => {
  const [collegeStatus, setCollegeStatus] = useState("");

  useEffect(() => {
    // Function to check the current time and set the college status
    const checkCollegeStatus = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const dayOfWeek = currentTime.getDay(); // Sunday is 0, Monday is 1, and so on...

      // Check if it's Sunday and set college status to "Closed"
      if (dayOfWeek === 0) {
        setCollegeStatus("Closed");
        return; // Return early to avoid further checks
      }

      // Define college timing ranges
      const morningStart = 10 * 60; // 10:00 AM in minutes
      const morningEnd = 13 * 60; // 1:00 PM in minutes
      const afternoonStart = 14 * 60; // 2:00 PM in minutes
      const afternoonEnd = 17 * 60; // 5:00 PM in minutes

      // Check the current time and set college status
      if (
        (hours * 60 + minutes >= morningStart &&
          hours * 60 + minutes <= morningEnd) ||
        (hours * 60 + minutes >= afternoonStart &&
          hours * 60 + minutes <= afternoonEnd)
      ) {
        setCollegeStatus("Open");
      } else {
        setCollegeStatus("Closed");
      }
    };

    // Initial check
    checkCollegeStatus();

    // Update college status every minute
    const intervalId = setInterval(checkCollegeStatus, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="status-container">
      <div>
        <TimeDisplay />
      </div>
      <h4>College Status: {collegeStatus}</h4>
      <p>
        {collegeStatus === "Open"
          ? "The college is currently open."
          : "Sorry, the college is currently closed. Please visit during the open hours."}
      </p>
      <div
        className={collegeStatus === "Open" ? "open-status" : "closed-status"}
      >
        <strong>Status: {collegeStatus}</strong>
      </div>
    </div>
  );
};

export default MessStatus;
