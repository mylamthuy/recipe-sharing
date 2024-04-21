"use client";
import React from "react";
import { useState, useEffect } from "react";
import PostInfo from "../components/post-info";
import { getPost } from "../_services/recipe-service";

export default function Page({ params }) {
  const [post, setPost] = useState({});


  const fetchPost = async () => {
    const post = await getPost(params.id);
    setPost(post);
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

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
