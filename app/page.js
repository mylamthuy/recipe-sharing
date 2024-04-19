"use client";
import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/header";
import NewPost from "./components/new-post";
import NewPostButton from "./components/new-post-button";
import { useUserAuth } from "./_utils/auth-context";
import dishData from "./dishes.json";
import DishList from "./components/dishList";
import { getDishes, addDish, uploadImage } from "./_services/recipe-service.js";
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
    post.dateCreated = new Date();
    post.creator = { id: user.uid, name: user.displayName };
    addDish(user.uid, post, image);
  };

  const handleCloseNewPost = () => { 
    setNewPostOpen(false);
  };

  const fetchDishes = async () => {
    if (user) {
      console.log("Fetching dishes for user:", user.uid);
      const dishes = await getDishes(user.uid);
      setDishes(dishes);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, [user]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value === "all") {
      setDishes(dishes);
      fetchDishes();
    } else {
      const filteredDishes = dishes.filter(
        (dish) => dish.category === e.target.value
      );
      setDishes(filteredDishes);
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

        <DishList dishes={dishes} />
      </div>

      {/* render dishes */}
      {/* <div>
        {dishes &&
          dishes.map((dish) => (
            <div key={dish.id}>
              <h2>{dish.title}</h2>
              <p>{dish.content}</p>
            </div>
          ))}
      </div> */}
      <div>
        {user && (
          <div>
            <h1>New Post</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const { title, content, category, imageUrl } =
                  e.target.elements;

                await addDish(
                  user.uid,
                  {
                    title: title.value,
                    content: content.value,
                    category: category.value,
                  },
                  image
                );

                title.value = "";
                content.value = "";
              }}
            >
              <div>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="text-black"
                />
              </div>
              <div>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" className="text-black" />
              </div>
              <div>
                <select
                  name="category"
                  className="border border-gray-300 rounded-md px-2 py-1"
                >
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
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />

                <button type="submit">Submit</button>
              </div>
              {/* <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              /> */}
            </form>
            {/* <button onClick={() => uploadImage(user.uid, image)}>
              Upload Image
            </button> */}
          </div>
        )}
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
