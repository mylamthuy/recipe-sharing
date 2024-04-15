 "use client"
import Header from "./components/header"
import React from "react";
import { useState } from "react";
import dishData from "./dishes.json";
import DishList from "./components/dishList";

export default function Page() {
    const [dishes, setDishes] = useState(dishData);
    const [filter, setFilter] = useState("all");

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        if (e.target.value === "all") {
        setDishes(dishData);
        } else {
        const filteredDishes = dishData.filter(
            (dish) => dish.category === e.target.value
        );
        setDishes(filteredDishes);
        }
    };
    return (
        <main>
            <div>
                <Header />
            </div>
            <div>
                <div className="text-right mr-5">
                    <select
                    className="border border-gray-300 rounded-md px-2 py-1"
                    value={filter}
                    onChange={handleFilterChange}
                    >
                    <option value="all">All</option>
                    <option value="indian">Indian</option>
                    <option value="korean">Korean</option>
                    <option value="chinese">Chinese</option>
                    <option value="vietnamese">Vietnamese</option>
                    <option value="western">Western</option>
                    <option value="thai">Thai</option>
                    <option value="european">European</option>
                    </select>
                </div>

                <DishList dishes={dishes} />
            </div>
        </main>
    );
}