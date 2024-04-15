"use client";
import React from "react";
import { useState } from "react";
import Heading1 from "../components/heading1";
import Label from "./label";

export default function NewPost() {
    const [postTitle, setPostTitle] = useState("");
    const [category, setCategory] = useState("");
    const [timeTaken, setTimeTaken] = useState("");
    const [portion, setPortion] = useState("");
    const [ingredientInput, setIngredientInput] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const handlePostTitleChange = (event) => {
        if (event.target.value !== ""){
        setPostTitle(event.target.value);
        }
    };

    const handleCategoryChange = (event) => {
        if (event.target.value !== ""){
            setCategory(event.target.value);
        }
    };

    const handleTimeTakenChange = (event) => {
        if (event.target.value !== ""){
            setTimeTaken(event.target.value);
        }
    }

    const handlePortionChange = (event) => {
        if (event.target.value !== ""){
            setPortion(event.target.value);
        }
    }

    const handleAddIngredient = () => {
        if (ingredientInput.trim() !== '') {
            setIngredients([...ingredients, ingredientInput.trim()]);
            setIngredientInput(''); // Clear input field after adding ingredient
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddIngredient();
        }
    };

    const handleEditIngredient = (index, newIngredient) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = newIngredient;
        setIngredients(updatedIngredients);
    };

    const handleDeleteIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const categoryOptions = ['INDIAN', 'KOREAN', 'CHINESE', 'VIETNAMESE', 'WESTERN', 'THAI', 'EUROPEAN', 'OTHERS'];
    const timeTakenOptions = ['15 MINUTES', '30 MINUTES', '45 MINUTES', '1 HOUR', '2 HOURS', '+2 HOURS '];
    const portionOptions = ['1', '2', '3', '4', '5', '6', '7', '+8'];

  return (
      <div className="flex justify-center items-center h-content">
        <div className="w-3/4 h-4/5 border-2 border-color rounded-3xl mb-8 mx-8">
            <Heading1 title='ADD A NEW POST'/>
            <div className="flex justify-center ">
            <form name='new-post' className="w-3/5">
            <div>
                <Label text='Post Title'/>
                <input
                    className="block w-full content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                    required
                    value={postTitle}
                    id="title"
                    name="post_title"
                    type="text"
                    placeholder="Enter a title for your post"
                    onChange={handlePostTitleChange}
                />
            </div>
            <div>
                <Label text='Category'/>
                <select
                    className="block w-1/5 content-color font-roboto text-base rounded-lg py-2 px-2 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                    required
                    id="category"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select a category</option>
                    {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <Label text='Time Taken'/>
                <select
                    className="block w-1/5 content-color font-roboto text-base rounded-lg py-2 px-2 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                    required
                    id="time"
                    name="time_taken"
                    value={timeTaken}
                    onChange={handleTimeTakenChange}
                >
                    {timeTakenOptions.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <Label text='Portion'/>
                <select
                    className="block w-1/5 content-color font-roboto text-base rounded-lg py-2 px-2 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                    required
                    id="portion"
                    name="portion"
                    value={portion}
                    onChange={handlePortionChange}
                >
                    {portionOptions.map((portion) => (
                        <option key={portion} value={portion}>
                            {portion}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <Label text='Ingredients'/>
                <div className="flex border-2 border-cyan-100">
                    <div>
                    <input
                        className=" content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                        required
                        id="ingredient"
                        name="ingredients"
                        type="text"
                        value={ingredientInput}
                        placeholder="Add an ingredient"
                        onChange={(e) => setIngredientInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    </div>
                    <button
                        className="w-16 font-bold font-roboto text-white green-background-color border border-color rounded-md py-1 focus:outline-none"
                        onClick={handleAddIngredient}
                    >Add</button>
                </div>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <span>{ingredient}</span>
                            <div>
                                <button onClick={() => handleEditIngredient(index, prompt('Enter new ingredient', ingredient))}>Edit</button>
                                <button onClick={() => handleDeleteIngredient(index)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Label text='Short Description'/>
                <textarea 
                    className="block w-full content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                    id="description"
                    name="short-description"
                    rows="3"
                    placeholder="Enter a short description for your post"
                ></textarea>
            </div>
            </form>
            </div>
        </div>
      </div>
  );
}
