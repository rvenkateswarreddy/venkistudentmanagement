import React from "react";
import "./UserAttendance.css"; // Import the CSS file

const UserAttendance = ({ data }) => {
  const {
    email,
    mobile,
    fullname,
    permanentAddress,
    course,
    department,
    attendance,
  } = data;

  if (!attendance) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-attendance-container">
      <h2>My College Attendance</h2>
      <table style={{ marginTop: 30 }} className="user-attendance-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Mobile</th>
            <th>Permanent Address</th>
            <th>Course</th>
            <th>Department</th>
            <th>Date</th>
            <th>Roll no</th>
            <th>Presence</th>
            <th>Attendance Id</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ color: "red" }}>
                Attendance details are not entered
              </td>
            </tr>
          ) : (
            attendance.map((record, index) => (
              <tr key={index}>
                <td>{fullname}</td>
                <td>{mobile}</td>
                <td>{permanentAddress}</td>
                <td>{course}</td>
                <td>{department}</td>
                <td>
                  {new Date(record.date).toLocaleString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td>{attendance[0].rollno}</td>
                <td>{record.isPresent ? "Present" : "Absent"}</td>
                <td>{record._id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserAttendance;
