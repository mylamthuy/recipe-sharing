import React from "react";
import Heading1 from "./heading1";
import Heading2 from "./heading2";
import Heading3 from "./heading3";
import { useUserAuth } from "../_utils/auth-context";
import {useState, useEffect} from "react";
import { checkUserPost, deleteDish } from "../_services/recipe-service";
import Link from "next/link";

function PostInfo({ data }) {
  const { user } = useUserAuth();
  const [checkOwnership, setCheckOwnership] = useState();
  const [uid, setUid] = useState();

  useEffect(() => {
    if (user) {
      console.log("User:", user.uid);
      checkUserPost(user.uid, data.id)
        .then((result) => {
          setCheckOwnership(result);
          setUid(user.uid);
          console.log("Ownership:", checkOwnership);
        })
        .catch((error) => {
          console.error("Error checking ownership:", error);
        });
    }
  }, [user, data.id, checkOwnership]);
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // console.log("Deleting dish:", data.id);
      // console.log("User:", uid); // Use uid instead of user.id
      await deleteDish(uid, data.id);
      // After successful deletion, navigate back to the main page
    } catch (error) {
      console.error("Error deleting dish:", error);
      // Handle the error, show a message to the user, etc.
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-2 border-color rounded-3xl w-11/12 my-10">
        <div className="flex flex-col items-center justify-center h-content px-8 mb-5">
          <Heading1 title={data.title} />
          <p className="text-lg font-libre-baskerville mb-4">
            {data.category} Food · {data.timeTaken} · {data.portion} Servings
          </p>
          <div className="flex justify-center items-center">
            <img
              src={data.imageUrl}
              alt="dish"
              className="h-1/5 w-1/2 object-scale-down"
            />
          </div>
          <p className="indent-6 text-justify text-lg font-roboto my-4">{data.description}</p>
        </div>

        <div className="grid grid-cols-6 px-6">
          <div className="col-span-4 col-start-1 mr-4">
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
          <div className="col-span-2">
            <div className="border-2 border-color rounded-3xl p-8 secondary-background-color mb-3">
              <h3 className="text-lg font-bold font-roboto mb-2 title-color">
                INGREDIENTS
              </h3>
              {Array.isArray(data.ingredients) &&
              data.ingredients.length > 0 ? (
                <ul className="text-color">
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
      {checkOwnership === true ? (
            <button
              className="border border-gray-400 rounded-xl flex items-center mb-10 hover:bg-gray-200"
              onClick={handleDelete}>
              <Link href="/">
              <div className="py-1 px-2">
              <svg

                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                className="inline w-4 h-4 stroke-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              <span className="font-roboto text-sm text-gray-500"> Delete post</span>
              </div>
              </Link>
            </button>
          ) : null}
    </div>
  );
}

export default PostInfo;
