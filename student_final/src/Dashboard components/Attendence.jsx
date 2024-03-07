import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Attendence.css";

const Attendence = () => {
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [rollno, setrollno] = useState("");
  const [isPresent, setIsPresent] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch user profile data when component mounts
    axios
      .get("https://student-management-qr9p.onrender.com/allprofiles", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // Filter user list to display only users with usertype 'user'
        const filteredUsers = response.data.data.filter(
          (user) => user.usertype === "user"
        );

        setUserList(filteredUsers);

        // Set the userId to the first user in the filtered list
        if (filteredUsers.length > 0) {
          setUserId(filteredUsers[0]._id);
        }
      })
      .catch((error) => {
        toast.error("Error fetching user profile:", error);
      });
  }, []); // Empty dependency array to run effect only once when component mounts

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://student-management-qr9p.onrender.com/attendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            userId,
            date,
            rollno,
            isPresent,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Attendance marked successfully");
      } else {
        toast.error(responseData.error || "Error marking attendance");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Error marking attendance");
    }
  };

  return (
    <div className="container_attendence">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">Select Student:</label>
          <select
            id="userId"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          >
            {userList.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullname} - {user.email}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollno">Rollno</label>
          <input
            id="rollno"
            type="rollno"
            className="form-control"
            value={rollno}
            onChange={(e) => setrollno(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isPresent">Is Present:</label>
          <input
            id="isPresent"
            type="checkbox"
            className="form-check-input"
            checked={isPresent}
            onChange={(e) => setIsPresent(e.target.checked)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Attendence;
