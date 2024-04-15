"use client";
import React from "react";
import { useState } from "react";
import Heading1 from "../components/heading1";
import Label from "./label";

export default function NewPost() {
    const [postTitle, setPostTitle] = useState("");

    const handlePostTitleChange = (event) => {
        setPostTitle(event.target.value);
    };

  return (
      <div className="flex justify-center items-center h-content">
        <div className="w-full h-dvh border-2 border-color rounded-3xl mb-8 mx-8">
            <Heading1 title='ADD A NEW POST'/>
            <div className="flex justify-center ">
            <form name='new-post' className="w-4/5">
            <div>
                {/* <label className="text-2xl text-color font-libre-baskerville font-bold">Post Title</label> */}
                <Label text='Post Title'/>
                <input
                    className="block w-full content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                    required
                    value={postTitle}
                    name="post-title"
                    type="text"
                    placeholder="Enter a title for your post"
                    onChange={handlePostTitleChange}
                />
            </div>
            <div>
                <Label text='Short Description'/>
                <textarea 
                    className="block w-full content-color font-roboto text-base rounded-lg py-2 px-4 mt-2 mb-4 secondary-background-color border border-color focus:outline-none focus:shadow-inner"
                    //id="short-description"
                    name="short-description"
                    rows="3"
                    placeholder="Enter a short description for your post"
                ></textarea>
                

            </div>
            </form>
            </div>
        </div>
      </div>
  );
}
