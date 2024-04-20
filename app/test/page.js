"use client";
import React from "react";
import { useState } from "react";
import { storage } from "../_utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function test() {
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Uploaded a image!");
    });
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}
