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

  const [filter, setFilter] = useState("all");
  //const [image, setImage] = useState(null);

  const fetchPosts = async () => {
    const temp = await getAllPosts();
    setPosts(temp);
  };

   useEffect(() => {
  //   fetchPosts();
     console.log("use Effect executed");
   }, [posts]);

  // const handleCreatePost = (post) => {
  //   addDish(user.uid, post, image);
  // };

  const handleCloseNewPost = () => {
    setNewPostOpen(false);
  };

  // const handleFilterChange = (e) => {
  //   setFilter(e.target.value);
  //   if (e.target.value === "all") {
  //     setPosts(posts);
  //     fetchPosts();
  //   } else {
  //     const filteredPosts = posts.filter(
  //       (post) => {post.category.toLowerCase() === e.target.value
  //                 console.log("post category: ", post.category.toLowerCase())
  //               console.log("post: ", post)}
  //     );
  //     setPosts(filteredPosts);
  //     fetchPosts();
  //   }
  // };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    
    if (selectedFilter === "all") {
      fetchPosts(); // Fetch all posts again
    } else {
      // Filter posts based on the selected category
      const filteredPosts = posts.filter(post => post.category.toLowerCase() === selectedFilter);
      setPosts(filteredPosts);
    }
    
    // Update the filter state
    setFilter(selectedFilter);
  };
  console.log("Render - Post: ", posts);

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
        
        <div className="text-right mr-10">
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
      {/* test */}
      {/* <div className="mb-6">
        <input
          type="file"
          onChange={(e) => {
            // Log the selected file object to verify
            console.log("Selected file:", e.target.files[0]);

            // Update state with the selected file
            setImage(e.target.files[0]);
          }}
        />
      </div> */}

      {user && <NewPostButton onClick={() => setNewPostOpen(true)} />}
      {newPostOpen && (
        <NewPost
          //onCreatePost={handleCreatePost}
          onCloseForm={handleCloseNewPost}
          //onSetImage={setImage}
        />
      )}
    </main>
  );
}
