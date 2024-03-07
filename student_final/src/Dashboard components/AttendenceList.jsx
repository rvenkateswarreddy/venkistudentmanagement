import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceList = () => {
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
        // Filter out users with usertype 'admin' and get the latest attendance entry for each user
        const filteredData = res.data.data
          .filter((user) => user.usertype !== "admin")
          .map((user) => {
            return {
              ...user,
              attendance:
                user.attendance.length > 0
                  ? [user.attendance[user.attendance.length - 1]]
                  : [],
            };
          });
        setUserData(filteredData);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = userData.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTable = (userData, title) => (
    <div id="attendanceTableContainer" className="tableWholeContainer">
      <h2 style={{ marginTop: "10px" }}>{title}</h2>
      <div className="table-container">
        <table className="neumorphic-table">
          <thead>
            <tr>
              <th>User Type</th>
              <th>Rollno</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Date</th>

              <th>Is Present</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) =>
              user.attendance.map((entry, index) => (
                <tr key={`${user._id}-${index}`}>
                  <td>{user.usertype}</td>
                  <td>{entry.rollno}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>
                    {new Date(entry.date).toLocaleString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>

                  <td className="red_attendence">
                    {entry.isPresent ? "Yes" : "No"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <input
        style={{ marginTop: "20px" }}
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        renderTable(filteredUsers, "Attendance List")
      )}
    </div>
  );
};

export default AttendanceList;
