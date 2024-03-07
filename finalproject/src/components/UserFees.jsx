import React, { useState, useEffect } from "react";
import "./UserAttendance.css"; // Import the CSS file

const UserFees = ({ data }) => {
  const {
    email,
    mobile,
    fullname,
    permanentAddress,
    course,
    department,
    fees,
  } = data;

  if (!fees) {
    return <div>Loading...</div>;
  }

  // Calculate the total amount paid
  const totalAmountPaids = fees.reduce((acc, fee) => acc + fee.feeAmount, 0);

  // Calculate the fee due
  const feeDueAmount = 52000 - totalAmountPaids;

  return (
    <div className="user-attendance-container">
      <h2>My COLLEGE Fees</h2>
      <table style={{ marginTop: 30 }} className="user-attendance-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Mobile</th>
            <th>Permanent Address</th>
            <th>Course</th>
            <th>Department</th>
            <th>Total Fee</th>
            <th>Fee Paid</th>

            <th>Payment Date</th>
            <th>Fees Id</th>
          </tr>
        </thead>
        <tbody>
          {fees.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ color: "red" }}>
                Fees details are not entered
              </td>
            </tr>
          ) : (
            fees.map((record, index) => (
              <tr key={index}>
                <td>{fullname}</td>
                <td>{mobile}</td>
                <td>{permanentAddress}</td>
                <td>{course}</td>
                <td>{department}</td>
                <td>52000 Rs</td>
                <td>{record.feeAmount}Rs</td>

                <td>
                  {new Date(record.paymentDate).toLocaleString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td>{record._id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <h4 style={{ marginTop: 30 }}>
        <span style={{ color: "blue" }}>TOTAL AMOUNT PAID : </span>
        {totalAmountPaids}Rs
      </h4>
      <h4>
        <span style={{ color: "red" }}>TOTAL FEE DUE/AMOUNT TO PAY : </span>
        {feeDueAmount}Rs
      </h4>
    </div>
  );
};

export default UserFees;
