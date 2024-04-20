"use client";
import React from "react";
import { useState } from "react";
import Header from "../components/header";
import Heading1 from "../components/heading1";
import PostInfo from "../components/post-info";
import dishData from "../dishes.json";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const [post, setPost] = useState({});

  const recipe = dishData[0];
  // const fetchPost = async () => {
  //   const post = await getPost(params.id);
  //   setPost(post);
  // };

  // useEffect(() => {
  //   fetchPost();
  // }, [params.id]);
console.log(recipe);
  if(!post) {
    return (
      <div>
        <img />
        <Heading1 title="Post Not Found" />
      </div>
    )
  }

  return (
    <main>
      <PostInfo data={recipe}/>
    </main>
  );
}
