import React from "react";
import Dish from "./dish";

function DishList({ dishes }) {
  const dishOnClick = (title) => {
    alert(`Dish ${title} clicked`);
  };
  const renderDishes = () => {
    return (
      <div className="flex flex-row flex-wrap justify-middle mt-5 mr-5">
        {dishes.map((dish) => (
          <div key={parseInt(dish.id)} className="ml-10">
            <Dish
              id={dish.id}
              img={dish.imageUrl}
              title={dish.title}
              onClick={dishOnClick}
            />
          </div>
        ))}
      </div>
    );
  };
  return renderDishes();
}

export default DishList;
