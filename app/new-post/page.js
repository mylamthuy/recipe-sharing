"use client";
import React from "react";
import { useState } from "react";
import Header from "../components/header";
import Heading1 from "../components/heading1";
import Info from "../components/info";
import dishData from "../dishes.json";

export default function Page() {
  const [dishes, setDishes] = useState(dishData);
  const firstDish = dishes[0];
  console.log(firstDish);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex justify-center items-center h-content">
        <div className="w-full min-h-full border-2 border-color rounded-3xl p-8 mb-8 mx-8">
          <Heading1 title={firstDish.name} />
          <Info
            category={firstDish.category}
            cookingTime={firstDish.cookingTime}
            serving={firstDish.serving}
            img={firstDish.image}
            ingredients={firstDish.ingredients}
            steps={firstDish.steps}
          />
        </div>
      </div>
    </div>
  );
}
