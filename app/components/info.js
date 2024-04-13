import React from "react";

function Info({ category, cookingTime, serving, img, ingredients, steps }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-content">
        <p className="text-xl font-libre-baskerville mb-4">
          {category} food · {cookingTime} min · {serving} servings
        </p>
        <div className="flex justify-center items-center">
          <img src={img} alt="dish" className="w-60 h-60 rounded-lg mb-4" />
        </div>
      </div>

      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <div className="col-start-1">
            <h3 className="text-4xl font-bold mt-4 mb-2 title-color font-libre-baskerville">
              Instructions
            </h3>
            {Array.isArray(steps) && steps.length > 0 ? (
              <ol className="text-lg text-color ml-4">
                {steps.map((step, index) => (
                  <>
                    <li key={index}>Step {index + 1}</li>
                    <p>· {step}</p>
                  </>
                ))}
              </ol>
            ) : (
              <p className="text-color">No steps provided</p>
            )}
          </div>
        </div>
        <div className="col-span-1">
          <div className="border-2 border-color rounded-3xl p-4 background-color: bg-[#fdfaf3]/80 ">
            <h3 className="text-xl font-bold mb-2 title-color">Ingredients</h3>
            {Array.isArray(ingredients) && ingredients.length > 0 ? (
              <ul className="text-lg text-color">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>· {ingredient}</li>
                ))}
              </ul>
            ) : (
              <p className="text-color">No ingredients provided</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
