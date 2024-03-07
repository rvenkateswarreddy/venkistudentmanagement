import React, { useState, useEffect } from "react";
import axios from "axios";

const Fees = () => {
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
        setUserData(res.data.data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = userData
    .filter((user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => user.usertype !== "admin");

  const renderTable = (userData, title) => (
    <div id="allprofiletablecontainer" className="tablewholecontainer">
      <h2 style={{ marginTop: "10px" }}>ALL FEES LIST</h2>
      <div className="table-container">
        <table className="neumorphic-table">
          <thead>
            <tr>
              <th>Full Name</th>

              <th>Mobile</th>

              <th>Course</th>
              <th>Department</th>

              <th>Year of Study</th>
              <th>Admission Number</th>
              <th>Fees (Amount)</th>
              <th>Fees (ID)</th>
              <th>Fees (Payment Date)</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id}>
                <td style={{ textTransform: "uppercase" }}>{user.fullname}</td>

                <td>{user.mobile}</td>

                <td>{user.course || "N/A"}</td>
                <td>{user.department || "N/A"}</td>

                <td>{user.yearOfStudy || "N/A"}</td>
                <td>{user.admissionNumber || "N/A"}</td>
                <td>
                  {user.fees.map((fee) => fee.feeAmount).join(", ") || "N/A"}
                </td>
                <td>{user.fees.map((fee) => fee._id).join(", ") || "N/A"}</td>
                <td>
                  {user.fees.map((fee) => fee.paymentDate).join(", ") || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        className="attendence_search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        renderTable(filteredUsers, "All Profiles")
      )}
    </div>
  );
};

export default Fees;
