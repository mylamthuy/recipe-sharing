import React, {useState} from "react";

export default function CustomModal ({closeModal, onSave, defaultValue}) {
    const [editedItem, setEditedItem] = useState(defaultValue || "");

    const handleChange = (e) => {
        setEditedItem(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedItem);
        closeModal();
    };

    return (
        <div 
            className="absolute inset-0 h-content w-full bg-gray-300/50 flex justify-center items-center"
            onClick={closeModal}
        >
            <div 
                className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
                onClick={(e) => {
                    e.stopPropagation(); // prevent click from bubbling up to parent div
                  }}>
                <p className="text-lg font-libre-baskerville font-bold text-center content-color">Update Bio</p>
                    <textarea
                        className="w-3/4 min-w-80 p-2 block mt-4 mb-4 content-color font-roboto text-base rounded-lg secondary-background-color border border-color focus:border-2 focus:outline-none"
                        rows='3'
                        name="bio"
                        value={editedItem}
                        onChange={handleChange}
                    >
                    </textarea>
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