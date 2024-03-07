import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Managerooms.css"; // Import CSS file for component-specific styles

const Managerooms = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://svhostel.onrender.com/allprofiles", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // Filter user profiles
        const userData = res.data.data.filter(
          (user) => user.usertype === "user"
        );
        setData(userData);
        setFilteredData(userData); // Initialize filtered data
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    // Filter data based on search term
    const filtered = data.filter((user) => user.roomno.includes(searchTerm));
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="managerooms-container">
      {" "}
      {/* Apply container styles */}
      <input
        type="text"
        placeholder="Search by Room Number"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      {data.length == 0 ? (
        <div className="redloading">Loading...</div>
      ) : (
        <table className="user-table">
          {" "}
          {/* Apply table styles */}
          <thead>
            <tr>
              <th>Room Number</th>

              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Course</th>
              <th>Department</th>
              <th>Year of Study</th>
              <th>Admission Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => (
              <tr key={user._id}>
                <td>{user.roomno || "N/A"}</td>

                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.gender || "N/A"}</td>
                <td>{user.permanentAddress || "N/A"}</td>
                <td>{user.course || "N/A"}</td>
                <td>{user.department || "N/A"}</td>
                <td>{user.yearOfStudy || "N/A"}</td>
                <td>{user.admissionNumber || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Managerooms;
