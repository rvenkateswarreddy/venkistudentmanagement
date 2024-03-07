import React from "react";
import "./UserExam.css";

const UserExam = ({ data }) => {
  const {
    email,
    mobile,
    fullname,
    permanentAddress,
    course,
    department,
    exam,
  } = data;

  if (!exam) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        User Information and Exam
      </div>
      <div className="card-body">
        <h5 className="card-title">Full Name: {fullname}</h5>
        <p className="card-text">
          <strong>Email:</strong> {email}
          <br />
          <strong>Mobile:</strong> {mobile}
          <br />
          <strong>Permanent Address:</strong> {permanentAddress}
          <br />
          <strong>Course:</strong> {course}
          <br />
          <strong>Department:</strong> {department}
        </p>
        <div className="exam-details">
          <h5 className="card-title">Exam Details</h5>
          <ul className="list-unstyled">
            <li>
              <strong>Web Technology:</strong>{" "}
              {exam.fixedSubjects.Web_technology}
            </li>
            <li>
              <strong>Software Engineer:</strong>{" "}
              {exam.fixedSubjects.Software_Engineer}
            </li>
            <li>
              <strong>Computer Graphics:</strong>{" "}
              {exam.fixedSubjects.Computer_graphics}
            </li>
            <li>
              <strong>{exam.selectableSubjects.list1.type}:</strong>{" "}
              {exam.selectableSubjects.list1.score}
            </li>
            <li>
              <strong>{exam.selectableSubjects.list2.type}:</strong>{" "}
              {exam.selectableSubjects.list2.score}
            </li>
            <li>
              <strong>{exam.selectableSubjects.list3.type}:</strong>{" "}
              {exam.selectableSubjects.list3.score}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserExam;
