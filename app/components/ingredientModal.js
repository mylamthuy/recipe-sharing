import React, {useState, useRef, useEffect} from "react";

export default function IngredientModal ({closeModal, onSave, defaultValue}) {
    const editIngredientRef = useRef(defaultValue || "");
    const [error, setError] = useState("");

    useEffect(() => {
        // Set the initial value of the input element when defaultValue changes
        editIngredientRef.current.value = defaultValue || "";
      }, [defaultValue]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const editedIngredient = editIngredientRef.current.value;
        if (editedIngredient.trim() === "") {
            setError("Please fill in the ingredient !!");
        } else {
            onSave(editedIngredient);
            closeModal();
        }
    };

    return (
        <div 
            className="absolute inset-0 h-content w-full bg-gray-300/50 flex justify-center items-center"
            onClick={closeModal}
        >
            <div 
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
                onClick={(e) => {
                    e.stopPropagation();
                  }}>
                <p className="text-lg font-libre-baskerville font-bold text-center content-color">Update Ingredient</p>
                    <input
                        className="w-11/12 p-2 block mt-4 mb-2 content-color font-roboto text-base rounded-lg secondary-background-color border border-color focus:border-2 focus:outline-none"
                        name="ingredient"
                        ref={editIngredientRef}
                    >
                    </input>
                    {error && <p className="text-red-600 text-sm font-roboto mb-4">{error}</p>}
                    <button 
                        className="w-24 p-2 font-roboto text-white tracking-wider rounded-lg green-background-color hover:font-bold hover:shadow-md"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
            </div>
        </div>
    )
}