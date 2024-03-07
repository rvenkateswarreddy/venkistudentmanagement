import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Examdetails.css";

const Examdetails = () => {
  const [userId, setUserId] = useState("");
  const [marks, setMarks] = useState({
    Web_technology: "",
    Software_Engineer: "",
    Computer_graphics: "",
    list1: { type: "", score: "" },
    list2: { type: "", score: "" },
    list3: { type: "", score: "" },
  });
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get("https://student-management-qr9p.onrender.com/allprofiles", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const filteredUsers = response.data.data.filter(
          (user) => user.usertype === "user"
        );

        setUserList(filteredUsers);

        if (filteredUsers.length > 0) {
          setUserId(filteredUsers[0]._id);
        }
      })
      .catch((error) => {
        toast.error("Error fetching user profile:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `https://student-management-qr9p.onrender.com/exam/${userId}`,
        marks,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        alert("Exam marks added successfully");
        setMarks({
          Web_technology: "",
          Software_Engineer: "",
          Computer_graphics: "",
          list1: { type: "", score: "" },
          list2: { type: "", score: "" },
          list3: { type: "", score: "" },
        });
      } else {
        toast.error("Error adding exam marks");
      }
    } catch (error) {
      console.error("Error adding exam marks:", error);
      toast.error("Error adding exam marks");
    }
  };

  return (
    <div className="container_exammarks">
      <h2>Add Exam Marks</h2>
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
                style={{ textTransform: "uppercase", marginTop: 20 }}
                key={user._id}
                value={user._id}
              >
                {user.fullname}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Web_technology">Web Technology:</label>
          <input
            type="number"
            id="Web_technology"
            placeholder="Enter Marks"
            className="form-control"
            value={marks.Web_technology}
            onChange={(e) =>
              setMarks({ ...marks, Web_technology: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Software_Engineer">Software Engineer:</label>
          <input
            type="number"
            id="Software_Engineer"
            placeholder="Enter Marks"
            className="form-control"
            value={marks.Software_Engineer}
            onChange={(e) =>
              setMarks({ ...marks, Software_Engineer: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Computer_graphics">Computer Graphics:</label>
          <input
            type="number"
            id="Computer_graphics"
            placeholder="Enter Marks"
            className="form-control"
            value={marks.Computer_graphics}
            onChange={(e) =>
              setMarks({ ...marks, Computer_graphics: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="list1">Generic elective1</label>
          <select
            id="list1"
            className="form-control"
            value={marks.list1.type}
            onChange={(e) =>
              setMarks({
                ...marks,
                list1: { ...marks.list1, type: e.target.value },
              })
            }
            required
          >
            <option value="">Select Subject</option>
            <option value="Artificial_intelligence">
              Artificial Intelligence
            </option>
            <option value="System_programming">System Programming</option>
            <option value="Datamining_data_warehouse">
              Datamining Data Warehouse
            </option>
          </select>
          <input
            type="number"
            id="list1Marks"
            className="form-control"
            value={marks.list1.score}
            onChange={(e) =>
              setMarks({
                ...marks,
                list1: { ...marks.list1, score: e.target.value },
              })
            }
            required
            placeholder="Enter marks"
          />
        </div>
        <div className="form-group">
          <label htmlFor="list2">Generic Elective2</label>
          <select
            id="list2"
            className="form-control"
            value={marks.list2.type}
            onChange={(e) =>
              setMarks({
                ...marks,
                list2: { ...marks.list2, type: e.target.value },
              })
            }
            required
          >
            <option value="">Select Subject</option>
            <option value="Cryptography">Cryptography</option>
            <option value="Big_data_analytics">Big Data Analytics</option>
            <option value="Mobile_development">Mobile Development</option>
          </select>
          <input
            type="number"
            id="list2Marks"
            className="form-control"
            value={marks.list2.score}
            onChange={(e) =>
              setMarks({
                ...marks,
                list2: { ...marks.list2, score: e.target.value },
              })
            }
            required
            placeholder="Enter marks"
          />
        </div>
        <div className="form-group">
          <label htmlFor="list3">Open Elective</label>
          <select
            id="list3"
            className="form-control"
            value={marks.list3.type}
            onChange={(e) =>
              setMarks({
                ...marks,
                list3: { ...marks.list3, type: e.target.value },
              })
            }
            required
          >
            <option value="">Select Subject</option>
            <option value="English">English</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Political">Political</option>
          </select>
          <input
            type="number"
            id="list3Marks"
            className="form-control"
            value={marks.list3.score}
            onChange={(e) =>
              setMarks({
                ...marks,
                list3: { ...marks.list3, score: e.target.value },
              })
            }
            required
            placeholder="Enter marks"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Examdetails;
