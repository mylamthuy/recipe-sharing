import React from "react";
import Link from "next/link";

function Dish({ id, img, title, onClick }) {

  const handleClick = () => {
    onClick(id); // Pass the name of the dish as an argument
  };
  return (
    <Link href={`/${id}`}>
      <div className="flex flex-col items-center mt-8" onClick={handleClick}>
        <img src={img} alt={title} className="mb-2 w-56 h-56 object-cover rounded-xl" />{" "}
        <p className="text-center">{title}</p>
      </div>
    </Link>
  );
}

export default Dish;
