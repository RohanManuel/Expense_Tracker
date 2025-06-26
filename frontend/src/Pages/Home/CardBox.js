import React from "react";
import CircularProgressBar from "../../components/CircularProgressBar";
import "./cardbox.css";

const CardBox = (props) => {
  const cards = [
    { title: "Total Balance", content: "$5,430.00", percentage: 75 },
    { title: "Monthly Savings", content: "$1,250.00", percentage: 45 },
    { title: "Yearly Expenses", content: "$12,850.00", percentage: 65 },
    { title: "Investment Growth", content: "+8.2%", percentage: 82 },
  ];

  return (
    <>
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="col-lg-3 col-md-6 mb-4"
          style={{ "--order": index }} // For staggered animation
        >
          <div className="card h-100">
            <div className="card-header bg-transparent border-success">
              {card.title}
            </div>
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.content}</p>
            </div>
            <div className="progress-container d-flex justify-content-center">
              <CircularProgressBar percentage={card.percentage} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardBox;