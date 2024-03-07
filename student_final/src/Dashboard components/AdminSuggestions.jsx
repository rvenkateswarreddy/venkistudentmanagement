import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminComplaints.css"; // Import the CSS file

const AdminSuggestions = () => {
  const [usersWithSuggestions, setUsersWithSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Fixed typo in isLoading state variable

  useEffect(() => {
    axios
      .get(
        "https://student-management-qr9p.onrender.com/admindashboard/suggestions",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setUsersWithSuggestions(res.data.data);
        setIsLoading(false); // Updated state variable name to match the declaration
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container3">
      {" "}
      {/* Removed redundant curly braces */}
      <h2 className="heading">USER MADE SUGGESTIONS</h2>
      {isLoading ? ( // Updated isLoading variable name to match the declaration
        <div className="redloading">Loading...</div>
      ) : (
        usersWithSuggestions
          .filter((user) => user.suggestions.length > 0)
          .map((user, index) => (
            <div key={index} className="userContainer">
              <h3 className="userName">{user.fullname}</h3>
              <p className="userEmail">User: {user.email}</p>
              <ul className="suggestionList">
                {user.suggestions.map((suggestion, suggestionIndex) => (
                  <li key={suggestionIndex} className="suggestionItem">
                    <p className="suggestionTitle">
                      <strong>Title:</strong> {suggestion.title}
                    </p>
                    <p className="suggestionDescription">
                      <strong>Description:</strong> {suggestion.description}
                    </p>
                    <p className="suggestionStatus">
                      <strong>Status:</strong> {suggestion.status}
                    </p>
                    <p className="suggestionId">
                      <strong>Suggestion ID:</strong> {suggestion._id}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))
      )}
    </div>
  );
};

export default AdminSuggestions;
