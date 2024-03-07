import React from "react";
import UserFees from "./UserFees"; // Import the UserFees component

const ParentComponent = ({ feesData }) => {
  // Calculate total due before rendering UserFees component
  const totalDue = feesData.reduce((acc, curr) => acc - curr.feeAmount, 52000);

  return <UserFees data={feesData} totalDue={totalDue} />;
};

export default ParentComponent;
