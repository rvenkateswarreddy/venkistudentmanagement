import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MarkList.css"; // Import CSS file for styling

const MarkList = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch user profile data when component mounts
    axios
      .get("https://student-management-qr9p.onrender.com/allprofiles", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // Filter out users with usertype 'admin' and get the latest exam entry for each user
        const filteredData = res.data.data.filter(
          (user) => user.usertype !== "admin"
        );

        setUserData(filteredData);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => console.error(err));
  }, []);

  const calculateTotalMarks = (exam) => {
    const fixedSubjects = exam.fixedSubjects;
    const selectableSubjects = exam.selectableSubjects;
    let totalMarks = 0;

    totalMarks += fixedSubjects.Web_technology || 0;
    totalMarks += fixedSubjects.Software_Engineer || 0;
    totalMarks += fixedSubjects.Computer_graphics || 0;
    totalMarks += selectableSubjects.list1?.score || 0;
    totalMarks += selectableSubjects.list2?.score || 0;
    totalMarks += selectableSubjects.list3?.score || 0;

    return totalMarks;
  };

  const calculatePercentage = (exam) => {
    const totalMarks = calculateTotalMarks(exam);
    return ((totalMarks / 350) * 100).toFixed(2); // Assuming total marks is 350
  };

  const filteredUsers = userData.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="marklist-container1">
      <h2 style={{ color: "red", marginTop: "20px" }}>ALL MARKS LIST</h2>
      <input
        type="text"
        className="marginsearch"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container1">
          {filteredUsers.map((user) => (
            <div key={user._id} className="card1">
              <h3>{user.fullname}</h3>

              <p>Mobile: {user.mobile}</p>
              {user.exam ? (
                <>
                  <p>
                    <span>Web Technology:</span>{" "}
                    {user.exam.fixedSubjects.Web_technology || "N/A"}
                  </p>
                  <p>
                    <span>Software Engineer:</span>{" "}
                    {user.exam.fixedSubjects.Software_Engineer || "N/A"}
                  </p>
                  <p>
                    <span>Computer Graphics:</span>{" "}
                    {user.exam.fixedSubjects.Computer_graphics || "N/A"}
                  </p>
                  <p>
                    <span>{user.exam.selectableSubjects.list1?.type}</span>:{" "}
                    {user.exam.selectableSubjects.list1?.score || "N/A"}
                  </p>
                  <p>
                    <span>{user.exam.selectableSubjects.list2?.type}</span>:{" "}
                    {user.exam.selectableSubjects.list2?.score || "N/A"}
                  </p>
                  <p>
                    <span>{user.exam.selectableSubjects.list3?.type}</span>:{" "}
                    {user.exam.selectableSubjects.list3?.score || "N/A"}
                  </p>
                  <p>
                    <span>Total Marks: </span>
                    {calculateTotalMarks(user.exam)}
                  </p>
                  <p>
                    <span>Percentage:</span> {calculatePercentage(user.exam)}%
                  </p>
                </>
              ) : (
                <p style={{ color: "red" }}>No exam data available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarkList;
