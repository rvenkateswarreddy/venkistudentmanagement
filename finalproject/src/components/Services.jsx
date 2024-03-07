import React from "react";
import "./Services.css"; // Import the CSS file for styling

const Services = () => {
  return (
    <div className="neumorphic-container">
      <h2>Student Management Services</h2>
      <p>
        Welcome to our student management services! We are dedicated to
        providing comprehensive solutions to meet the needs of students and
        enhance their educational experience.
      </p>

      <h3>Our Services Include:</h3>
      <ul>
        <li>
          <strong>Enrollment Assistance:</strong> Guidance and support during
          the enrollment process.
        </li>
        <li>
          <strong>Academic Advising:</strong> Personalized academic guidance and
          counseling.
        </li>
        <li>
          <strong>Student Records Management:</strong> Secure storage and
          management of student records and information.
        </li>
        {/* Add more services as needed */}
      </ul>

      <h3>How to Access Services:</h3>
      <p>
        To access any of our services, students can visit our office during
        working hours or reach out to us through the provided communication
        channels.
      </p>

      <h3>Contact Information:</h3>
      <p>
        For inquiries or assistance, please contact our student management team.
      </p>
      <address>
        Sri Venkateswara University Hostel, Tirupati,
        <br />
        Andhra Pradesh, India.
        <br />
        Phone: +9108345405345
        <br />
        Email: svhostel@gmail.com
      </address>
    </div>
  );
};

export default Services;
