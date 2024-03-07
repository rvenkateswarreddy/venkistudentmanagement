import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeesGenerate = () => {
  const [userId, setUserId] = useState("");
  const [feeAmount, setFeeAmount] = useState("");
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
        // Filter out users with usertype of "user"
        const filteredUsers = response.data.data.filter(
          (user) => user.usertype === "user"
        );
        setUserList(filteredUsers);
        setUserId(filteredUsers[0]?._id);
      })
      .catch((error) => {
        toast.error("Error fetching user profile:", error);
      });
  }, []); // Empty dependency array to run effect only once when component mounts

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `https://student-management-qr9p.onrender.com/fees/${userId}`,
        { feeAmount }
      );
      if (response.status === 200) {
        toast.success("Fee payment added successfully");
        setFeeAmount(""); // Clear input field after successful submission
      } else {
        toast.error("Error adding fee payment");
      }
    } catch (error) {
      console.error("Error adding fee payment:", error);
      toast.error("Error adding fee payment");
    }
  };

  return (
    <div className="container_attendence">
      <h2>Add Fee Payment</h2>
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
              <option
                style={{ textTransform: "uppercase" }}
                key={user._id}
                value={user._id}
              >
                {user.fullname}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="feeAmount">Fee Amount:</label>
          <input
            type="number"
            id="feeAmount"
            value={feeAmount}
            onChange={(e) => setFeeAmount(e.target.value)}
            required
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

export default FeesGenerate;
