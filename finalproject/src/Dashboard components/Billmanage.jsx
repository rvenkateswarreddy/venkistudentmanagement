import React, { useEffect, useState } from "react";
import "./Billmange.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BillManage = () => {
  const [selectedUserId, setSelectedUserId] = useState(""); // State to store the selected user ID
  const [formData, setFormData] = useState({
    days: "",
    leaveDays: "",
    nonVegCharge: "",
    vegCharge: "",
    totalFoodCharge: "",
    noonVegCharge: "",
    roomCharge: "",
    totalAmount: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        "https://student-management-qr9p.onrender.com/allprofiles",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      const filteredUsers = data.data.filter(
        (user) => user.usertype === "user"
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(
        `https://student-management-qr9p.onrender.com/hostelmess/${selectedUserId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success("Hostel mess details added successfully");
      // Optionally, reset form data and selected user ID here
      setFormData({
        days: "",
        leaveDays: "",
        nonVegCharge: "",
        vegCharge: "",
        totalFoodCharge: "",
        noonVegCharge: "",
        roomCharge: "",
        totalAmount: "",
      });
      setSelectedUserId("");
    } catch (error) {
      console.error("Error adding hostel mess details:", error);
      toast.error("Error adding hostel mess details: " + error.message);
    }
  };

  return (
    <div className="bill-manage-container">
      <h2>Add Hostel Mess Details</h2>
      <form className="bill-form" onSubmit={handleSubmit}>
        <div className="form-group1">
          <label htmlFor="user">Select User:</label>
          <select
            id="user"
            name="user"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullname}
              </option>
            ))}
          </select>
        </div>

        {/* Input fields for mess details */}
        <div className="mess-details">
          <label htmlFor="days">Days:</label>
          <input
            type="number"
            id="days"
            name="days"
            value={formData.days}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="leaveDays">Leave Days:</label>
          <input
            type="number"
            id="leaveDays"
            name="leaveDays"
            value={formData.leaveDays}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="nonVegCharge">Non-Veg Charge:</label>
          <input
            type="number"
            id="nonVegCharge"
            name="nonVegCharge"
            value={formData.nonVegCharge}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="vegCharge">Veg Charge:</label>
          <input
            type="number"
            id="vegCharge"
            name="vegCharge"
            value={formData.vegCharge}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="totalFoodCharge">Total Food Charge:</label>
          <input
            type="number"
            id="totalFoodCharge"
            name="totalFoodCharge"
            value={formData.totalFoodCharge}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="noonVegCharge">Non Veg Charge:</label>
          <input
            type="number"
            id="noonVegCharge"
            name="noonVegCharge"
            value={formData.noonVegCharge}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="roomCharge">Room Charge:</label>
          <input
            type="number"
            id="roomCharge"
            name="roomCharge"
            value={formData.roomCharge}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="totalAmount">Total Amount:</label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BillManage;
