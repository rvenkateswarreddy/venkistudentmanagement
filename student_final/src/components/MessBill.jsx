import React, { useEffect, useState } from "react";
import axios from "axios";

const MessBill = () => {
  const [messDetails, setMessDetails] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://student-management-qr9p.onrender.com/myprofile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the JWT token in localStorage
            },
          }
        );
        const userId = response.data.mydata._id;

        const responseMess = await axios.get(
          `https://student-management-qr9p.onrender.com/hostelmess/${userId}`
        );
        setMessDetails(responseMess.data.data || []);
      } catch (error) {
        console.error("Error fetching user profile and mess details:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>Mess Bill Details</h2>
      {messDetails.length > 0
        ? messDetails.map((details, index) => (
            <div key={index}>
              <p>Days: {details.days}</p>
              <p>Leave Days: {details.leaveDays}</p>
              <p>Non-Veg Charge: {details.nonVegCharge}</p>
              <p>Veg Charge: {details.vegCharge}</p>
              <p>Total Food Charge: {details.totalFoodCharge}</p>
              <p>Noon Veg Charge: {details.noonVegCharge}</p>
              <p>Room Charge: {details.roomCharge}</p>
              <p>Total Amount: {details.totalAmount}</p>
            </div>
          ))
        : "NO MESS DETAILS ARE AVAILABLE"}
    </div>
  );
};

export default MessBill;
