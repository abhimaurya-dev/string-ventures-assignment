import React from "react";

const Card = ({ title, value, icon }) => {
  return (
    <div className="card w-64 bg-base-100 shadow-xl">
      <div className="card-body flex items-center">
        <div className="text-5xl">{icon}</div>
        <div>
          <h2 className="card-title">{title}</h2>
          <p className="text-lg font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
