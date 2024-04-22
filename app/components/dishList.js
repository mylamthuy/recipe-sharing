import React from "react";
import Dish from "./dish";

function DishList({ dishes }) {
  const [filter, setFilter] = React.useState("all");

  if (dishes.length === 0) {
    return (
      <div className="flex justify-start items-center ml-8 mt-2">
          <h2 className="text-lg font-roboto">No posts found</h2>
        </div>
    )
  }

  let categories = [...new Set(dishes.map((dish) => dish.category).sort())];

  if (filter !== "all") {
    dishes = dishes.filter((dish) => dish.category === filter);
  }

  const dishOnClick = (id) => {
  };
    return (
      <div className="mb-10">
        <div className="text-right mr-10">
          <select
            className="border border-gray-300 rounded-md px-2 py-1"
            id="category"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option key="all" value = "all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row flex-wrap justify-middle mt-5 mr-5">
          {dishes.map((dish) => (
            <div key={dish.id} className="ml-10">
              <Dish
                id={dish.id}
                img={dish.imageUrl}
                title={dish.title}
                onClick={dishOnClick}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

export default DishList;
