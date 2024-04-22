"use client";
import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/header";
import NewPost from "./components/new-post";
import NewPostButton from "./components/new-post-button";
import { useUserAuth } from "./_utils/auth-context";
import DishList from "./components/dishList";
import { getAllPosts } from "./_services/recipe-service.js";

export default function Page() {
  const { user } = useUserAuth();
  const [posts, setPosts] = useState([]);
  const [newPostOpen, setNewPostOpen] = useState(false);

  const fetchPosts = async () => {
    const temp = await getAllPosts();
    setPosts(temp);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCloseNewPost = () => {
    setNewPostOpen(false);
  };

  return (
    <main>
      <div>
        <Header />
      </div>
      <div className="w-full flex justify-center items-center mb-10">
          <img className="h-52 w-full object-cover mx-auto" 
              src="https://firebasestorage.googleapis.com/v0/b/test-24f28.appspot.com/o/images%2Fmain-quote.png?alt=media&token=73342f89-d680-42d2-af8e-04884549ef46" />
      </div>
      <div>

        <DishList dishes={posts} />
      </div>

      {user && <NewPostButton onClick={() => setNewPostOpen(true)} />}
      {newPostOpen && (
        <NewPost
          onCloseForm={handleCloseNewPost}
        />
      )}
    </main>
  );
}
