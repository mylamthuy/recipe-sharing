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
      console.log("User:", uid);
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
      console.log("Deleting dish:", data.id);
      console.log("User:", uid); // Use uid instead of user.id
      await deleteDish(uid, data.id);
      // After successful deletion, navigate back to the main page
    } catch (error) {
      console.error("Error deleting dish:", error);
      // Handle the error, show a message to the user, etc.
    }
  };

  return (
    <div className="flex justify-center items-center">
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
              //className="w-60 h-60 rounded-lg mb-4"
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
          {checkOwnership === true ? (
            <button onClick={handleDelete}>
              <Link href="/">Delete Button</Link>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PostInfo;
