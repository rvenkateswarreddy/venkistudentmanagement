import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const notify = () => {
    alert("please login to access");
    toast.success("Stay booked successfully!!!");
  };

  return (
    <>
      <ToastContainer />

      <div className="hero-section">
        <h1>STUDENT MANAGEMENT</h1>
        <p>Welcome to SVU ,BEST PLACE TO UPSKILL YOUR KNOWLEDGE</p>
        <Link to="/login">
          <button className="book-button" onClick={notify}>
            LEARN HERE
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
