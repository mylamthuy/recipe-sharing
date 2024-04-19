// "use client";
// import React from "react";
// import { useState } from "react";
// import Heading1 from "../components/heading1";
// import Label from "./label";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";

// export default function NewPost() {
//     const [postTitle, setPostTitle] = useState("");
//     const [category, setCategory] = useState("");
//     const [timeTaken, setTimeTaken] = useState("");
//     const [portion, setPortion] = useState("");
//     const [ingredientInput, setIngredientInput] = useState("");
//     const [ingredients, setIngredients] = useState([]);

//     const handlePostTitleChange = (event) => {
//         if (event.target.value !== ""){
//         setPostTitle(event.target.value);
//         }
//     };

//     const handleCategoryChange = (event) => {
//         if (event.target.value !== ""){
//             setCategory(event.target.value);
//         }
//     };

//     const handleTimeTakenChange = (event) => {
//         if (event.target.value !== ""){
//             setTimeTaken(event.target.value);
//         }
//     }

//     const handlePortionChange = (event) => {
//         if (event.target.value !== ""){
//             setPortion(event.target.value);
//         }
//     }

//     const handleAddIngredient = () => {
//         if (ingredientInput.trim() !== '') {
//             setIngredients([...ingredients, ingredientInput.trim()]);
//             setIngredientInput(''); // Clear input field after adding ingredient
//         }
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             handleAddIngredient();
//         }
//     };

//     const handleEditIngredient = (index, newIngredient) => {
//         const updatedIngredients = [...ingredients];
//         updatedIngredients[index] = newIngredient;
//         setIngredients(updatedIngredients);
//     };

//     const handleDeleteIngredient = (index) => {
//         const updatedIngredients = [...ingredients];
//         updatedIngredients.splice(index, 1);
//         setIngredients(updatedIngredients);
//     };

//     const categoryOptions = ['Indian', 'Korean', 'Chinese', 'Vietnamese', 'Western', 'Thai', 'European', 'Others'];
//     const timeTakenOptions = ['15 minutes', '30 minutes', '45 minutes', '1 hour', '2 hours', '+2 hours'];
//     const portionOptions = ['1', '2', '3', '4', '5', '6', '7', '+8'];

//   return (
//       <div className="flex justify-center items-center h-content">
//         <div className="w-3/4 h-4/5 border-2 border-color rounded-3xl mb-8 mx-8">
//             <Heading1 title='ADD A NEW POST'/>
//             <div className="flex justify-center ">
//             <form name='new-post' className="w-3/5">
//             <div>
//                 <Label text='Post Title'/>
//                 <input
//                     className="block w-full content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
//                     required
//                     value={postTitle}
//                     id="title"
//                     name="post_title"
//                     type="text"
//                     placeholder="Enter a title for your post"
//                     onChange={handlePostTitleChange}
//                 />
//             </div>
//             <div>
//                 <Label text='Category'/>
//                 <select
//                     className="block w-1/5 content-color font-roboto text-base rounded-lg py-2 px-2 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
//                     required
//                     id="category"
//                     name="category"
//                     value={category}
//                     onChange={handleCategoryChange}
//                 >
//                     <option value="">Select a category</option>
//                     {categoryOptions.map((category) => (
//                         <option key={category} value={category}>
//                             {category}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <Label text='Time Taken'/>
//                 <select
//                     className="block w-1/5 content-color font-roboto text-base rounded-lg py-2 px-2 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
//                     required
//                     id="time"
//                     name="time_taken"
//                     value={timeTaken}
//                     onChange={handleTimeTakenChange}
//                 >
//                     {timeTakenOptions.map((time) => (
//                         <option key={time} value={time}>
//                             {time}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <Label text='Portion'/>
//                 <select
//                     className="block w-1/5 content-color font-roboto text-base rounded-lg py-2 px-2 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
//                     required
//                     id="portion"
//                     name="portion"
//                     value={portion}
//                     onChange={handlePortionChange}
//                 >
//                     {portionOptions.map((portion) => (
//                         <option key={portion} value={portion}>
//                             {portion}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <Label text='Ingredients'/>
//                 <div className="flex w-3/5">
//                     <input
//                         className="flex-1 content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 mr-6 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
//                         required
//                         id="ingredient"
//                         name="ingredients"
//                         type="text"
//                         value={ingredientInput}
//                         placeholder="Add an ingredient"
//                         onChange={(e) => setIngredientInput(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                     />
//                     <button
//                         className=" w-16 font-bold font-roboto text-white green-background-color mt-2 mb-4 border border-color rounded-md py-1 focus:outline-none"
//                         onClick={handleAddIngredient}
//                     >Add</button>
//                 </div>
//                 <ul>
//                     {ingredients.map((ingredient, index) => (
//                         <li key={index} className="flex items-center justify-between">
//                             <div className="flex w-3/5">
//                             <span className="flex-1">{ingredient}</span>
//                             <div>
//                                 <button
//                                     className="mr-2"
//                                     onClick={() => handleEditIngredient(index, prompt('Enter new ingredient', ingredient))}><FaRegEdit /></button>
//                                 <button onClick={() => handleDeleteIngredient(index)}><RiDeleteBin6Line /></button>
//                             </div>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div>
//                 <Label text='Short Description'/>
//                 <textarea 
//                     className="block w-full content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
//                     id="description"
//                     name="short-description"
//                     rows="3"
//                     placeholder="Enter a short description for your post"
//                 ></textarea>
//             </div>
//             <div>
//                 <Label text='Instructions'/>
//                 <div>
//                     <label className="text-lg content-color ml-2">Step Title</label>
//                     <input
//                     className="block w-full content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
//                     required
//                     // value={}
//                     id="title"
//                     name="step_title"
//                     type="text"
//                     placeholder="Add step title. Example: Step 1: Preheat and prepare"
//                     //onChange={}
//                 />
//                 </div>
//                 <div>
//                     <label className="text-lg content-color ml-2">Step Instruction</label>
//                     <textarea 
//                         className="block w-full content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
//                         required
//                         id="instruction"
//                         name="step_instruction"
//                         rows="6"
//                         placeholder="Enter instructions for this step. Example: Preheat oven to 180 degrees Celsius. Prepare baking tray."
//                     ></textarea>
//                 </div>
                
//             </div>
//             </form>
//             </div>
//         </div>
//       </div>
//   );
// }
