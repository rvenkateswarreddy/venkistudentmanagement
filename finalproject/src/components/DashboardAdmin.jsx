// Import the useState hook
import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import AllProfiles from "../Dashboard components/AllProfiles";
import AdminComplaints from "../Dashboard components/AdminComplaints";
import BillGenerator from "../Dashboard components/BillGenerator";
import Feeslist from "../Dashboard components/Feeslist";
import Hostelpics from "../Dashboard components/Hostelpics";
import MessStatus from "../Dashboard components/MessStatus";
import AdminSuggestions from "../Dashboard components/AdminSuggestions";
import TimeDisplay from "../Dashboard components/TimeDisplay";
import Attendence from "../Dashboard components/Attendence";
import AttendenceList from "../Dashboard components/AttendenceList";
import Fees from "../Dashboard components/Fees";
import Examdetails from "../Dashboard components/Examdetails";
import Billmanage from "../Dashboard components/Billmanage";
import Managerooms from "../Dashboard components/Managerooms";
// import WelcomeMessage from "../Dashboard components/WelcomeMessage";
import Welcomeuser from "./Welcomeuser";
import "./Dashboard.css";
import axios from "axios";
import FeesGenerate from "../Dashboard components/FeesGenerate";
import MarkList from "../Dashboard components/MarkList";

const DashboardAdmin = () => {
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://svhostel.onrender.com/allprofiles", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setdata(res.data.data))
      .catch((er) => console.log(er));
  }, []);
  useEffect(() => {
    axios
      .get("https://svhostel.onrender.com/myprofile", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) =>
        setdata1({
          usertype: res.data.mydata.usertype,
          email: res.data.mydata.email,
          mobile: res.data.mydata.mobile,
          fullname: res.data.mydata.fullname,
        })
      )
      .catch((er) => console.log(er));
  }, []); // Empty dependency array to run the effect only once on mount
  // console.log(data1);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDropdownToggle = (isOpen) => {
    // Set the dropdown state
    setDropdownOpen(isOpen);

    // Toggle body overflow based on dropdown state
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  };
  const adminhandle = () => {
    navigate("/admindashboard");
  };

  return (
    <Container-fluid className="dashboard-container">
      {/* Navbar */}
      <Navbar
        bg="dark"
        variant="dark"
        className="justify-content-between dashboardnavbar"
      >
        <Navbar.Brand className="dashboard" onClick={adminhandle}>
          ADMINDASHBOARD
        </Navbar.Brand>
        <Row>
          <Col>
            <TimeDisplay />
          </Col>
        </Row>
        <Nav className="mr-auto">
          <Nav.Link>Settings</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown
            title="User"
            id="basic-nav-dropdown"
            onToggle={handleDropdownToggle}
            className="custom-dropdown"
          >
            <NavDropdown.Item
              className="drop"
              as={NavLink}
              to="/admindashboard/allprofiles"
            >
              AllProfile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/dashboard/settings">
              Settings
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>

      <Row>
        {/* Sidebar */}
        <Col md={3} className="sidebar">
          <Nav className="flex-column">
            <Nav.Item>
              <NavLink to="/admindashboard/allprofiles" className="nav-link">
                AllProfiles
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink to="/admindashboard/attendance" className="nav-link">
                Attendance
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/admindashboard/attendancelist" className="nav-link">
                AttendanceList
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/admindashboard/feesgenerate" className="nav-link">
                FeesGenerate
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/admindashboard/fees" className="nav-link">
                Fees
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/admindashboard/examdetails" className="nav-link">
                Exam details
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/admindashboard/marklist" className="nav-link">
                MarkList
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/admindashboard/admincomplaints"
                className="nav-link"
              >
                StudentComplaints
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/admindashboard/billgenerator" className="nav-link">
                Bill Generator
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink to="/admindashboard/hostelpics" className="nav-link">
                College gallery
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Main Content */}

        <Col md={9} className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Welcomeuser
                  username={data1.fullname}
                  usertype={data1.usertype}
                />
              }
            />
            <Route path="allprofiles" element={<AllProfiles data={data} />} />
            <Route path="admincomplaints" element={<AdminComplaints />} />
            <Route path="billgenerator" element={<BillGenerator />} />
            <Route path="hostelpics" element={<Hostelpics />} />

            <Route path="attendance" element={<Attendence />} />
            <Route path="attendancelist" element={<AttendenceList />} />
            <Route path="feesgenerate" element={<FeesGenerate />} />
            <Route path="fees" element={<Fees />} />
            <Route path="examdetails" element={<Examdetails />} />
            <Route path="marklist" element={<MarkList />} />
          </Routes>
        </Col>
      </Row>
    </Container-fluid>
  );
};

export default DashboardAdmin;
