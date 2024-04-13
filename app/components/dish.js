import React from "react";

function Dish({ img, name }) {
  return (
    <div className="flex flex-col items-center mt-8">
      <img src={img} alt={name} className="mb-2 w-48 h-48" />{" "}
      {/* Margin bottom for spacing */}
      <p className="text-center">{name}</p> {/* Center the text */}
    </div>
  );
}

export default Dish;
