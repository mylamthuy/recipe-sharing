import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  doc,
  getDoc,
  setDoc,
  getCountFromServer,
} from "firebase/firestore";
import { storage } from "../_utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";

export const addDish = async (userId, dish, img) => {
  console.log(img);
  try {
    // Check if the userId document exists
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    // If the userId document doesn't exist, create it
    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {}); // You can set initial data here if needed
    }

    const {
      title,
      category,
      timeTaken,
      portion,
      description,
      ingredients,
      instructions,
    } = dish;

    const dishData = {
      title,
      category,
      timeTaken,
      portion,
      description,
      ingredients,
      instructions,
    };

    // Add the dish data to the "dishes" subcollection of the userId document
    const docRef = await addDoc(
      collection(db, "users", userId, "dishes"),
      dishData
    );

    let downloadURL = null;
    if (img == null) {
      // Default image URL if no image provided
      downloadURL =
        "https://firebasestorage.googleapis.com/v0/b/recipe-sharing-53c0d.appspot.com/o/users%2FPremium%20Vector%20_%20Set%20of%20tasty%20breakfast%20food%20with%20colored%20doodle%20style%20on%20white.jpeg?alt=media&token=a2c561b2-f013-41da-95f5-38254207cd7c";

      await updateDoc(docRef, {
        imageUrl: downloadURL,
      });
    } else {
      // Upload image and update image URL
      const userImagesRef = ref(storage, `images/${img.name + v4()}`);
      // uploadBytes(userImagesRef, img).then(() => {
      //   alert("Image uploaded successfully");
      // });

      const imageName = `${v4() + "_" + userId + "_"}`;
      const imageRef = ref(userImagesRef, imageName);

      await uploadBytes(imageRef, img);
      downloadURL = await getDownloadURL(imageRef);

      await updateDoc(docRef, {
        imageUrl: downloadURL,
      });
    }

    console.log("Document written with ID: ", docRef.id);
    alert("Your recipe has been added successfully");

    return docRef.id;
  } catch (error) {
    console.error("Error in addDish: ", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const getUserPosts = async (userId) => {
  try {
    const docRef = collection(db, "users", userId, "dishes");
    const docSnap = await getDocs(docRef);

    const mappedItems = docSnap.docs.map((postDoc) => ({
      id: postDoc.id,
      ...postDoc.data(),
    }));
    return mappedItems;
  } catch (error) {
    console.error("Error in getDishes: ", error);
  }
};

export const getUserID = async () => {
  try {
    const usersCollectionRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollectionRef);

    const userIds = usersSnapshot.docs.map((doc) => doc.id);
    return userIds;
  } catch (error) {
    console.error("Error in getAllUserIds: ", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const getAllPosts = async () => {
  try {
    const userIDs = await getUserID();
    const posts = [];

    for (const id of userIDs) {
      const userPosts = await getUserPosts(id);
      posts.push(...userPosts);
    }

    return posts;
  } catch (error) {
    console.error("Error in getAllPosts: ", error);
    throw error; // Rethrow the error to handle it outside of this function if needed
  }
};

export const getPost = async (postId) => {
  try {
    const userIDs = await getUserID();

    for (const id of userIDs) {
      const userPosts = await getUserPosts(id);
      const post = userPosts.find((post) => post.id === postId);

      if (post) {
        return post;
      }
    }

    return null;
  } catch (error) {
    console.error("Error in getPost: ", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// export const addRecipe = async (userId, recipeData) => {
//     try {
//       const { title, content, image } = recipeData;
//       const dishData = {
//         title,
//         content,
//         imageUrl: null,
//       };

//       // Upload image and then add recipe
//       if (image && image.size > 0) {
//         const imageUrl = await uploadImage(image);
//         dishData.imageUrl = imageUrl;
//       }

//       await addDish(userId, dishData);

//       // Additional logic if needed...

//     } catch (error) {
//       console.error("Error in addRecipe: ", error);
//     }
//   };
