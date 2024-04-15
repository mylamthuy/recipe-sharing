"use client";
import React from "react";
import NewPost from "../components/new-post";
import Header from "../components/header";

export default function Profile() {
  return (
    <div>
      <div>
        <Header />
      </div>
        <NewPost />
    </div>
  );
}
