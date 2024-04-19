import React, { useState } from "react";

export default function InstructionModal({ closeModal, onSave, defaultValue }) {
  const [instruction, setInstruction] = useState(
    defaultValue || {
      step: "",
      description: "",
    }
  );
  const [error, setError] = useState("");

  const validateForm = () => {
    if (instruction.step && instruction.description) {
      setError("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(instruction)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setError(errorFields.join(", ") + " cannot be empty !!");
      return false;
    }
  };

  const handleOnChange = (e) => {
    setInstruction({ ...instruction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSave(instruction);
    closeModal();
  };

  return (
    <div
      className="absolute inset-0 w-full bg-gray-300/50 h-content flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="text-lg font-libre-baskerville font-bold text-center content-color">
          Update Step Instruction
        </p>
        <label htmlFor="step" className="content-color font-roboto text-base">
          Step:
        </label>
        <input
          className="w-11/12 p-2 block mt-4 mb-2 content-color font-roboto text-base rounded-lg secondary-background-color border border-color focus:border-2 focus:outline-none"
          name="step"
          value={instruction.step}
          onChange={handleOnChange}
        ></input>
        <label
          htmlFor="description"
          className="content-color font-roboto text-base"
        >
          Description:
        </label>
        <textarea
          className="w-11/12 p-2 block mt-4 mb-2 content-color font-roboto text-base rounded-lg secondary-background-color border border-color focus:border-2 focus:outline-none"
          name="description"
          rows="6"
          placeholder="Enter instructions..."
          value={instruction.description}
          onChange={handleOnChange}
        ></textarea>
        {error && (
          <p className="text-red-600 text-sm font-roboto mb-4">{error}</p>
        )}
        <button
          className="w-24 p-2 font-roboto text-white tracking-wider rounded-lg green-background-color hover:font-bold hover:shadow-md"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}
