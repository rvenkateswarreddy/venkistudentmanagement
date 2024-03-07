// Import the useState hook
import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Myprofile from "../Dashboard components/Myprofile";
import Complaints from "../Dashboard components/Complaints";
import BillGenerator from "../Dashboard components/BillGenerator";
import MessStatus from "../Dashboard components/MessStatus";
import Suggestions from "../Dashboard components/Suggestions";
import TimeDisplay from "../Dashboard components/TimeDisplay";
import WelcomeMessage from "../Dashboard components/WelcomeMessage";
import "./Dashboard.css";
import Welcomeuser from "./Welcomeuser";

import axios from "axios";
import Hostelpics from "../Dashboard components/Hostelpics";
import UserAttendence from "./UserAttendence";
import UserFees from "./UserFees";
import UserExam from "./UserExam";
import TImeTable from "./TimeTable";
const Dashboard = () => {
  const [data, setdata] = useState({});
  const [sidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://student-management-qr9p.onrender.com/myprofile", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) =>
        setdata({
          _id: res.data.mydata._id,
          usertype: res.data.mydata.usertype,
          email: res.data.mydata.email,
          mobile: res.data.mydata.mobile,
          fullname: res.data.mydata.fullname,
          gender: res.data.mydata.gender,
          permanentAddress: res.data.mydata.permanentAddress,
          department: res.data.mydata.department,
          course: res.data.mydata.course,
          yearOfStudy: res.data.mydata.yearOfStudy,
          admissionNumber: res.data.mydata.admissionNumber,
          attendance: res.data.mydata.attendance,
          fees: res.data.mydata.fees,
          exam: res.data.mydata.exam,
        })
      )

      .catch((er) => console.log(er));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const adminhandle = () => {
    navigate("/dashboard");
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
          USERDASHBOARD
        </Navbar.Brand>
        <Row>
          <Col>
            <TimeDisplay />
          </Col>
          <Col>
            <WelcomeMessage username={data.fullname} />
          </Col>
        </Row>
        <Navbar.Toggle aria-controls="sidebar-nav" className="toggle-btn" />
        {/* Sidebar toggle button for small devices */}
        <Navbar.Collapse id="sidebar-nav">
          <Nav className="mr-auto">
            <Nav.Link>Settings</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title="User"
              id="basic-nav-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item
                className="drop"
                as={NavLink}
                to="/dashboard/myprofile"
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dashboard/settings">
                Settings
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row>
        {/* Sidebar */}
        <Col md={3} className={`sidebar ${sidebarActive ? "active" : ""}`}>
          <Nav className="flex-column">
            <Nav.Item>
              <NavLink
                to="/dashboard/myprofile"
                className="nav-link"
                onClick={() => setSidebarActive(false)}
              >
                My Profile
              </NavLink>
            </Nav.Item>
            {/* <Nav.Item>
              <NavLink
                to="/dashboard/messbill"
                className="nav-link"
                onClick={() => setSidebarActive(false)}
              >
                Mess Bill
              </NavLink>
            </Nav.Item> */}
            <Nav.Item>
              <NavLink
                to="/dashboard/complaints"
                className="nav-link"
                onClick={() => setSidebarActive(false)}
              >
                Complaints
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/dashboard/billgenerator"
                className="nav-link"
                onClick={() => setSidebarActive(false)}
              >
                Bill Generator
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/dashboard/hostelpics"
                className="nav-link"
                onClick={() => setSidebarActive(false)}
              >
                COLLEGE GALLERY
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/dashboard/userattendance"
                className="nav-link"
                onClick={() => setSidebarActive(false)}
              >
                Myattendance
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/dashboard/userfees"
                className="nav-link"
                onClick={() => setSidebarActive(false)}
              >
                Myfees
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/dashboard/myexammarks"
                className="nav-link"
                onClick={() => setSidebarActive(false)}
              >
                Exam details
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/dashboard/messstatus"
                className="nav-link"
                onClick={() => setSidebarActive(false)}
              >
                CollegeStatus
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/dashboard/timetable"
                className="nav-link"
                onClick={() => setSidebarActive(false)}
              >
                Time Table
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
                  username={data.fullname}
                  usertype={data.usertype}
                />
              }
            />
            <Route path="myprofile" element={<Myprofile data={data} />} />
            {/* <Route path="messbill" element={<MessBill data={data} />} /> */}
            <Route path="complaints" element={<Complaints />} />
            <Route path="billgenerator" element={<BillGenerator />} />
            <Route path="hostelpics" element={<Hostelpics />} />
            <Route
              path="userattendance"
              element={<UserAttendence data={data} />}
            />
            <Route path="userfees" element={<UserFees data={data} />} />
            <Route path="myexammarks" element={<UserExam data={data} />} />
            <Route path="messstatus" element={<MessStatus />} />
            <Route path="timetable" element={<TImeTable />} />
          </Routes>
        </Col>
      </Row>
    </Container-fluid>
  );
};

export default Dashboard;
