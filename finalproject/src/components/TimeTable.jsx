import React from "react";
import "./TimeTable.css";

const TImeTable = () => {
  return (
    <div className="table-container0">
      <h1>Time Table For Semister:</h1>
      <table className="custom-table0">
        <thead>
          <tr>
            <th>Date & Day</th>
            <th>Course Code</th>
            <th>QPCODE</th>
            <th>Paper</th>
            <th>Compulsory Foundation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>04-03-2024 Monday</td>
            <td>MCA-301</td>
            <td>12-00-3-01R</td>
            <td>301:Software Engineering</td>
            <td>CORE</td>
          </tr>
          <tr>
            <td>05-03-2024 Tuesday</td>
            <td>MCA-302</td>
            <td>12-00-3-02R</td>
            <td>302:Computer Graphics</td>
            <td>CORE</td>
          </tr>
          <tr>
            <td>06-03-2024 Wednesday</td>
            <td>MCA-303</td>
            <td>12-00-3-03R</td>
            <td>303:Web Technologies</td>
            <td>GENERIC ELECTIVE</td>
          </tr>
          <tr>
            <td>07-03-2024 Thursday</td>
            <td>MCA-304</td>
            <td>12-00-3-06R</td>
            <td>304:System Programming</td>
            <td>GENERIC ELECTIVE</td>
          </tr>
          <tr>
            <td>11-03-2024 Friday</td>
            <td>MCA-305</td>
            <td>12-00-3-09R</td>
            <td>305:Mobile Application Development</td>
            <td>OPEN ELECTIVE</td>
          </tr>
          <tr>
            <td>12-03-2024 Saturday</td>
            <td>MCA-306</td>
            <td>4-75-316</td>
            <td>316:Digital Marketing</td>
            <td>GENERIC ELECTIVE</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TImeTable;
