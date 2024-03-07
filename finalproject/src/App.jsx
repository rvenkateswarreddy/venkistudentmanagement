// Import necessary dependencies
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import DashboardAdmin from "./components/DashboardAdmin";
import Sharecomp from "./Sharecomp";
import Protect from "./Protect";
import Myprofile from "./Dashboard components/Myprofile";
import Complaints from "./Dashboard components/Complaints";
import BillGenerator from "./Dashboard components/BillGenerator";
import Billmanage from "./Dashboard components/Billmanage";
import Managerooms from "./Dashboard components/Managerooms";
import MessStatus from "./Dashboard components/MessStatus";
import Suggestions from "./Dashboard components/Suggestions";
import AllProfiles from "./Dashboard components/AllProfiles";
// import MessBill from "./components/MessBill";
import AdminComplaints from "./Dashboard components/AdminComplaints";
import AdminSuggestions from "./Dashboard components/AdminSuggestions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Feeslist from "./Dashboard components/Feeslist";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sharecomp />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>

        <Route
          path="/admindashboard/*"
          element={
            <Protect>
              <DashboardAdmin />
            </Protect>
          }
        >
          <Route path="allprofiles" element={<AllProfiles />} />
          <Route path="admincomplaints" element={<AdminComplaints />} />
          <Route path="billgenerator" element={<BillGenerator />} />
          <Route path="billmanage" element={<Billmanage />} />
          <Route path="managerooms" element={<Managerooms />} />
          <Route path="feeslist" element={<Feeslist />} />y
          <Route path="messstatus" element={<MessStatus />} />
          <Route path="adminsuggestions" element={<AdminSuggestions />} />
        </Route>
        <Route
          path="/dashboard/*"
          element={
            <Protect>
              <Dashboard />
            </Protect>
          }
        >
          <Route path="myprofile" element={<Myprofile />} />
          {/* <Route path="messbill" element={<MessBill />} /> */}

          <Route path="complaints" element={<Complaints />} />
          <Route path="adminbillgenerator" element={<BillGenerator />} />

          <Route path="messstatus" element={<MessStatus />} />
          <Route path="suggestions" element={<Suggestions />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
