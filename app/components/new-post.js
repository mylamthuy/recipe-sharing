"use client";
import React from "react";
import { useState, useRef } from "react";
import Heading1 from "./heading1";
import Label from "./label";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import IngredientModal from "./ingredientModal";
import InstructionModal from "./instructionModal";
import { addDish } from "../_services/recipe-service";
import { useUserAuth } from "../_utils/auth-context";

export default function NewPost({ onCloseForm }) {
  const { user } = useUserAuth();

    const postTitleRef = useRef("");
    const categoryRef = useRef("");
    const timeTakenRef = useRef("");
    const portionRef = useRef("");
    const descriptionRef = useRef("");
    const ingredientRef = useRef("");
    const stepTitleRef = useRef("");
    const instructionDescRef = useRef("");
    const [ingredients, setIngredients] = useState([]);
    const [modalIngredientOpen, setModalIngredientOpen] = useState(false);
    const [editIngredientId, setEditIngredientId] = useState(null);
    const [instructions, setInstructions] = useState([]);
    const [modalInstructionOpen, setModalInstructionOpen] = useState(false);
    const [instructionToEdit, setInstructionToEdit] = useState(null);
    const [image, setImage] = useState(null);
    const [ingreError, setIngreError] = useState("");
    const [instrError, setInstrError] = useState("");

  // Ingredient functions
  const handleAddIngredient = (e) => {
    const ingredientInput = ingredientRef.current.value;
    if (ingredientInput.trim() !== "") {
      e.preventDefault();
      setIngreError("");
      setIngredients([...ingredients, ingredientInput.trim()]);
      ingredientRef.current.value = "";
    } else {
      e.preventDefault(); // Prevent form submission if ingredient input is empty
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddIngredient();
    }
  };

  const handleCloseIngredientModal = () => {
    setModalIngredientOpen(false);
    setEditIngredientId(null);
  };

  const handleEditIngredientClick = (index) => {
    setEditIngredientId(index);
    setModalIngredientOpen(true);
  };

  const handleEditIngredient = (newIngredient) => {
    if (editIngredientId !== null) {
      const updatedIngredients = [...ingredients];
      updatedIngredients[editIngredientId] = newIngredient;
      setIngredients(updatedIngredients);
    }
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  // Instruction functions
  const handleAddInstruction = (e) => {
    e.preventDefault();
    const instructionStep = stepTitleRef.current.value;
    const instructionDescription = instructionDescRef.current.value;
    if (instructionStep.trim() !== "" && instructionDescription.trim() !== "") {
      setInstrError("");
      setInstructions([
        ...instructions,
        {
          step: instructionStep.trim(),
          description: instructionDescription.trim(),
        },
      ]);
      stepTitleRef.current.value = "";
      instructionDescRef.current.value = "";
    }
  };

  const handleDeleteInstruction = (targetIndex) => {
    setInstructions(instructions.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditInstructionClick = (index) => {
    setInstructionToEdit(index);
    setModalInstructionOpen(true);
  };

  const handleEditInstruction = (newInstruction) => {
    instructionToEdit === null
      ? setInstructions([...instructions, newInstruction])
      : setInstructions(
          instructions.map((currenctInstruction, index) => {
            if (index !== instructionToEdit) {
              return currenctInstruction;
            }
            return newInstruction;
          })
        );
  };

  const handleCloseInstructionModal = () => {
    setModalInstructionOpen(false);
    setInstructionToEdit(null);
  };

  const categoryOptions = [
    "Indian",
    "Korean",
    "Chinese",
    "Vietnamese",
    "Western",
    "Thai",
    "European",
    "Others",
  ];
  const timeTakenOptions = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "2 hours",
    "+2 hours",
  ];
  const portionOptions = ["1", "2", "3", "4", "5", "6", "7", "+8"];

  return (
    <div
      className="absolute inset-0 w-full bg-gray-300/50 flex justify-center items-center h-fit"
      onClick={onCloseForm}
    >
      <div
        className="w-3/4 mt-6 border-2 border-color rounded-3xl mb-8 mx-8 main-background-color"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Heading1 title="ADD A NEW POST" />
        <div className="flex justify-center">
          <form
          className="w-4/5"
            onSubmit={async (e) => {
              e.preventDefault();

              if (ingredients.length === 0) {
                setIngreError("Please add ingredients for the recipe !!")
                return;
              }

              if (instructions.length === 0) {
                setInstrError("Please add instructions for the recipe !!")
                return;
              }

              const { title, category, timeTaken, portion, description } =
                e.target.elements;

              await addDish(
                user.uid,
                {
                  title: postTitleRef.current.value,
                  category: categoryRef.current.value,
                  timeTaken: timeTakenRef.current.value,
                  portion: portionRef.current.value,
                  description: descriptionRef.current.value,
                  ingredients: ingredients,
                  instructions: instructions,
                },
                image
              );
                postTitleRef.current.value = "";
                categoryRef.current.value = "";
                timeTakenRef.current.value = "";
                portionRef.current.value = "";
                descriptionRef.current.value = "";
                ingredientRef.current.value = "";
                stepTitleRef.current.value = "";
                instructionDescRef.current.value = "";
              onCloseForm();
            }}
          >
            <div className="mb-6">
              <Label text="Post Title" />
              <input
                className="block w-full min-w-60 content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                required
                ref={postTitleRef}
                id="title"
                name="post-title"
                type="text"
                placeholder="Enter a title for your post"
              />
            </div>
            <div className="mb-6">
              <Label text="Category" />
              <select
                className="block w-60 content-color font-roboto text-base rounded-lg py-2 px-2 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                required
                ref={categoryRef}
                id="category"
                name="category"
              >
                <option value="">Select a category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <Label text="Cooking Time" />
              <select
                className="block w-60 content-color font-roboto text-base rounded-lg py-2 px-2 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                required
                ref={timeTakenRef}
                id="timeTaken"
                name="timeTaken"
              >
                <option value="">Select cooking time</option>
                {timeTakenOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <Label text="Serving" />
              <select
                className="block w-60 content-color font-roboto text-base rounded-lg py-2 px-2 mt-2 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                required
                ref={portionRef}
                id="portion"
                name="portion"
              >
                {portionOptions.map((portion) => (
                  <option key={portion} value={portion}>
                    {portion}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <Label text="Image" />
              <input
                className="mt-2"
                type="file"
                onChange={(e) => {
                  // Log the selected file object to verify
                  //console.log("Selected file:", e.target.files[0]);

                  // Update state with the selected file
                  setImage(e.target.files[0]);
                }}
              />
            </div>

            <div className="mb-6">
              <Label text="Short Description" />
              <textarea
                className="block w-full min-w-60 content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                ref={descriptionRef}
                id="description"
                name="short-description"
                rows="3"
                placeholder="Enter a short description for your post"
              ></textarea>
            </div>

            <div className="mb-6 w-4/5">
              <Label text="Ingredients" />
              <div className="flex">
                <input
                  className="flex-1 content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 mr-6 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                  ref={ingredientRef}
                  id="ingredient"
                  name="ingredients"
                  type="text"
                  placeholder="Add an ingredient"
                  onKeyDown={handleKeyDown}
                />
                
                <button
                  className="min-w-16 font-bold font-roboto text-white green-background-color mt-2 mb-4 border border-color rounded-md py-1 focus:outline-none hover:bg-green-800"
                  onClick={handleAddIngredient}
                >
                  Add
                </button>
                
              </div>
              {ingreError && <p className="text-red-600 text-sm font-roboto">{ingreError}</p>}
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between pl-4"
                  >
                    <div className="flex w-3/5">
                      <span className="flex-1">{ingredient}</span>
                      <div>
                        <button
                          className="mr-4 text-lg p-1 title-color hover:text-white hover:bg-emerald-800 rounded-md"
                          onClick={() => handleEditIngredientClick(index)}
                        >
                          <RiEdit2Fill />
                        </button>
                        <button
                          className="text-lg p-1 title-color hover:text-white hover:bg-emerald-800 rounded-md"
                          onClick={() => handleDeleteIngredient(index)}
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {modalIngredientOpen && (
                <IngredientModal
                  closeModal={handleCloseIngredientModal}
                  onSave={handleEditIngredient}
                  defaultValue={
                    editIngredientId !== null && ingredients[editIngredientId]
                  }
                />
              )}
            </div>

            <div>
              <Label text="Instructions" />
              <div>
                <label className="text-lg content-color ml-2">Step Title</label>
                <input
                  className="block w-full min-w-60 content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                  ref={stepTitleRef}
                  name="step_title"
                  type="text"
                  placeholder="Add step title. Example: Step 1: Preheat and prepare"
                />
              </div>
              <div>
                <label className="text-lg content-color ml-2">
                  Step Instruction
                </label>
                <textarea
                  className="block w-full min-w-60 content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                  ref={instructionDescRef}
                  name="step_instruction"
                  rows="6"
                  placeholder="Enter instructions for this step. Example: Preheat oven to 180 degrees Celsius. Prepare baking tray."
                ></textarea>
              </div>
              {instrError && <p className="text-red-600 text-sm font-roboto">{instrError}</p>}
              <div className="flex justify-center">
                <button
                  className="block w-1/4 min-w-32 font-bold font-roboto text-white green-background-color mt-2 mb-6 border border-color rounded-md py-2 focus:outline-none hover:bg-green-800"
                  onClick={handleAddInstruction}
                >
                  Add
                </button>
              </div>
              <ul className="mb-4 w-full">
                {instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex w-full items-center justify-between pl-2 mb-2"
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex w-full">
                        <span className="flex-1 title-color">
                          {instruction.step.toLocaleUpperCase()}
                        </span>
                        <div>
                          <button
                            className="mr-4 text-lg p-1 title-color hover:text-white hover:bg-emerald-800 rounded-md"
                            onClick={() => handleEditInstructionClick(index)}
                          >
                            <RiEdit2Fill />
                          </button>
                          <button
                            className="text-lg p-1 title-color hover:text-white hover:bg-emerald-800 rounded-md"
                            onClick={() => handleDeleteInstruction(index)}
                          >
                            <RiDeleteBin6Fill />
                          </button>
                        </div>
                      </div>
                      <p className="pl-2">{instruction.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              {modalInstructionOpen && (
                <InstructionModal
                  closeModal={handleCloseInstructionModal}
                  onSave={handleEditInstruction}
                  defaultValue={
                    instructionToEdit !== null &&
                    instructions[instructionToEdit]
                  }
                />
              )}
            </div>
            <div className="flex justify-center">
              <button
                className="w-4/5 text-lg font-roboto green-background-color text-white p-2 m-6 rounded-lg items-center justify-center hover:bg-green-800 hover:font-bold"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
