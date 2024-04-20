"use client";
import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/header";
import NewPost from "./components/new-post";
import NewPostButton from "./components/new-post-button";
import { useUserAuth } from "./_utils/auth-context";
import DishList from "./components/dishList";
import {
  getAllPosts,
  getUserPosts,
  addDish,
  getUserID,
  uploadImage,
} from "./_services/recipe-service.js";
import { storage } from "./_utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function Page() {
  const { user } = useUserAuth();
  const [posts, setPosts] = useState([]);
  const [newPostOpen, setNewPostOpen] = useState(false);

  const [dishes, setDishes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [image, setImage] = useState(null);

  const handleCreatePost = (post) => {
    addDish(user.uid, post, image);
  };

  const handleCloseNewPost = () => {
    setNewPostOpen(false);
  };

  const handleGetUserId = async () => {
    const userIDS = await getUserID();
    console.log(userIDS);
  };

  const fetchPosts = async () => {
    if (user) {
      const temp = await getAllPosts();
      setPosts(temp);
    }

    // const userIDS = await getUserID();
    // console.log(userIDS);
    // if (user) {
    //   const posts = await getAllPosts();
    //   //console.log(posts);
    //   setPosts(posts);
    // }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value === "all") {
      setPosts(posts);
      fetchPosts();
    } else {
      const filteredPosts = posts.filter(
        (post) => post.category === e.target.value
      );
      setPosts(filteredPosts);
    }
  };

  return (
    <main>
      <div>
        <Header />
      </div>
      <div>
        <div className="text-right mr-5">
          <select
            className="border border-gray-300 rounded-md px-2 py-1"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="indian">Indian</option>
            <option value="korean">Korean</option>
            <option value="chinese">Chinese</option>
            <option value="vietnamese">Vietnamese</option>
            <option value="western">Western</option>
            <option value="thai">Thai</option>
            <option value="european">European</option>
            <option value="other">Other</option>
          </select>
        </div>

        <DishList dishes={posts} />
        {/* <button onClick={handleGetUserId}>Get user id</button> */}
      </div>

      {user && <NewPostButton onClick={() => setNewPostOpen(true)} />}
      {newPostOpen && (
        <NewPost
          onCreatePost={handleCreatePost}
          onCloseForm={handleCloseNewPost}
          onSetImage={setImage}
        />
      )}
    </main>
  );
}
