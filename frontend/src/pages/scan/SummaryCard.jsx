import React from "react";

const SummaryCard = ({ label, count, percent, variant }) => {
  return (
    <div className={`summary-card ${variant}`}>
      <h4>{label}</h4>
      <p className="count">{count}</p>
      <span>{percent}</span>
    </div>
  );
};

export default SummaryCard;
