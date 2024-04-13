"use client";
import React from "react";
import { useState } from "react";
import Heading1 from "../components/heading1";

export default function NewPost() {
    const [postTitle, setPostTitle] = useState("");

    const handlePostTitleChange = (event) => {
        setPostTitle(event.target.value);
    };

  return (
      <div className="flex justify-center items-center h-content">
        <div className="w-full h-dvh border-2 border-color rounded-3xl p-8 mb-8 mx-8">
            <Heading1 title='ADD A NEW POST'/>
            <div className="flex justify-center ">
            <form className="w-4/5">
            <div>
                <label className="text-2xl text-color font-libre-baskerville font-bold">Post Title</label>
                <input
                    className="block w-full text-color font-roboto text-color text-lg rounded-lg py-2 pl-4 pr-2 mb-2 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                    required
                    value={postTitle}
                    name="title"
                    type="text"
                    placeholder="Enter a title for your post"
                    onChange={handlePostTitleChange}
                />
            </div>
            </form>
            </div>
        </div>
      </div>
  );
}
