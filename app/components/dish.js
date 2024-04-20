import React from "react";
import Modal from "react-modal";
import Link from "next/link";

function Dish({ id, img, title, onClick }) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const handleClick = () => {
    onClick(id); // Pass the name of the dish as an argument
  };
  return (
    <Link href={`/${id}`}>
      <div className="flex flex-col items-center mt-8" onClick={handleClick}>
        <img src={img} alt={title} className="mb-2 w-48 h-48" />{" "}
        {/* Margin bottom for spacing */}
        <p className="text-center">{title}</p> {/* Center the text */}
      </div>
    </Link>
  );
}

export default Dish;
