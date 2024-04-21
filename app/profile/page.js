"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useUserAuth } from "../_utils/auth-context";
import CustomModal from "../components/customModal";
import { getUserPosts } from "../_services/recipe-service";
import DishList from "../components/dishList";

export default function Profile() {
  const { user, gitHubSignIn, gitHubSignOut } = useUserAuth();
  // const [bio, setBio] = useState("");
  // const [modalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState();



  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        try {
          const temp = await getUserPosts(user.uid);
          setPosts(temp);
          setCount(temp.length);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();
  }, [user, posts]); // Include 'user' in the dependency array so useEffect runs when 'user' changes

  // useEffect(() => {
  //   console.log(posts); // Log the updated value of posts
  // }, [posts]); // Log posts whenever it changes


  // const handleBioChange = (bio) => {
  //   setBio(bio);
  // };

  if (!user) {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="flex justify-start items-center ml-8 mt-">
          <h2>Sign in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="m-2">
      <div>
        <Header />
      </div>
      <div className="my-2 mx-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 col-start-1 flex justify-center">
            <img
              src={user.photoURL}
              alt="profile image"
              className="w-20 h-20"
            />
          </div>
          <div className="col-span-2 col-start-2">
            <h2 className="font-libre-baskerville text-lg">{user.displayName}</h2>
            <p className="text-base">
              Your have {count} {count == 1 ? "posting" : "postings"}
            </p>
          </div>
        </div>
        {/* <div className="mx-6 my-4">
          <p className="font-roboto indent-6 px-4 py-2 mb-3">{bio}</p>
          <button className="border border-color font-roboto text-sm p-1 rounded-md w-28 hover:font-bold hover:border-2"
                  onClick={() => setModalOpen(true)}>
            Edit Bio
          </button>
        </div>
        {modalOpen && (
          <CustomModal
            closeModal={() => setModalOpen(false)}
            onSave={handleBioChange}
            defaultValue={bio !== "" ? bio : ""}
          />
        )} */}
      </div>
      <div className="mt-10 mb-4 mx-4">
        <DishList dishes={posts} />
      </div>
    </div>
  );
}