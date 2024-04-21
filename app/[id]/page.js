"use client";
import React from "react";
import { useState, useEffect } from "react";
import PostInfo from "../components/post-info";
import dishData from "../dishes.json";
import { getPost } from "../_services/recipe-service";

export default function Page({ params }) {
  const [post, setPost] = useState({});

  const recipe = dishData[0];

  const fetchPost = async () => {
    const post = await getPost(params.id);
    setPost(post);
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  console.log(recipe);
  if (!post) {
    return (
      <div className="flex justify-center items-center ml-8 mt-12">
        <h1 className="text-2xl">Post Not Found</h1>
      </div>
    );
  }

  return (
    <main>
      <PostInfo data={post} />
    </main>
  );
}
