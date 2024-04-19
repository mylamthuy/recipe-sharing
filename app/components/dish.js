import React from "react";
import Modal from "react-modal";

function Dish({ id, img, title, onClick }) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const handleClick = () => {
    onClick(title); // Pass the name of the dish as an argument
  };
  return (
    <div className="flex flex-col items-center mt-8" onClick={handleClick}>
      <img src={img} alt={title} className="mb-2 w-48 h-48" />{" "}
      {/* Margin bottom for spacing */}
      <p className="text-center">{title}</p> {/* Center the text */}
    </div>
  );
}

export default Dish;
