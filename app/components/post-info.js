import React from "react";
import Heading1 from "./heading1";
import Heading2 from "./heading2";
import Heading3 from "./heading3";

function PostInfo({ data }) {
  return (
    <div className="flex justify-center items-center">
      <div className="border-2 border-color rounded-3xl w-11/12 my-10">
        <div className="flex flex-col items-center justify-center h-content px-8 mb-5">
          <Heading1 title={data.title} />
          <p className="text-lg font-libre-baskerville mb-4">
            {data.category} FOOD · {data.timeTaken} · {data.portion} SERVINGS
          </p>
          <div className="flex justify-center items-center">
            <img
              src={data.imageUrl}
              alt="dish"
              className="w-60 h-60 rounded-lg mb-4"
            />
          </div>
          <p className="indent-6 text-justify">{data.description}</p>
        </div>

        <div className="grid grid-cols-4 px-8">
          <div className="col-span-3 col-start-1">
            <Heading2 title="Instructions" />
            {Array.isArray(data.instructions) &&
            data.instructions.length > 0 ? (
              <ul className="ml-4">
                {data.instructions.map((instruction, index) => (
                  <div className="mb-6" key={index}>
                    <li>
                      <Heading3 title={instruction.step} />
                    </li>
                    <p>{instruction.description}</p>
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-color">No steps provided</p>
            )}
          </div>
          <div className="col-span-1">
            <div className="border-2 border-color rounded-3xl p-8 secondary-background-color mb-3">
              <h3 className="text-lg font-bold font-roboto mb-2 title-color">
                INGREDIENTS
              </h3>
              {Array.isArray(data.ingredients) &&
              data.ingredients.length > 0 ? (
                <ul className="text-lg text-color">
                  {data.ingredients.map((ingredient, index) => (
                    <li key={index}>· {ingredient}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-color">No ingredients provided</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostInfo;
