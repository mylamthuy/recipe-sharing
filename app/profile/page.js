"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useUserAuth } from "../_utils/auth-context";
import { getUserPosts } from "../_services/recipe-service";
import DishList from "../components/dishList";

export default function Profile() {
  const { user, gitHubSignIn, gitHubSignOut } = useUserAuth();
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        try {
          console.log("User page Effect")
          const temp = await getUserPosts(user.uid);
          setPosts(temp);
          setCount(temp.length);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };
    fetchPosts();
  }, [user]); 

  if (!user) {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="flex justify-start items-center ml-8 mt-2">
          <h2 className="text-lg font-roboto">Sign in to view your profile</h2>
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
      </div>
      <div className="mt-10 mb-4 mx-4">
        <DishList dishes={posts} />
      </div>
    </div>
  );
}