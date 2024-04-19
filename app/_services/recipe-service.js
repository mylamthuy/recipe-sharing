import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  doc,
} from "firebase/firestore";
import { storage } from "../_utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";

export const addDish = async (userId, dish, img) => {
  try {
    const { title, content, category } = dish;

    // Add imageUrl to the dish object before saving to Firestore
    const dishData = {
      title,
      content,
      category,
    };

    const docRef = await addDoc(
      collection(db, "users", userId, "dishes"),
      dishData
    );
    let downloadURL = null;
    if (img == null) {
      downloadURL =
        "https://firebasestorage.googleapis.com/v0/b/recipe-sharing-53c0d.appspot.com/o/users%2FPremium%20Vector%20_%20Set%20of%20tasty%20breakfast%20food%20with%20colored%20doodle%20style%20on%20white.jpeg?alt=media&token=a2c561b2-f013-41da-95f5-38254207cd7c";
      await updateDoc(docRef, {
        imageUrl: downloadURL,
      });
    } else {
      const userImagesRef = ref(storage, "users", "images");
      const imageName = `${img + v4() + "_" + userId + "_"}`;
      const imageRef = ref(userImagesRef, imageName);
      console.log("imageRef: ", imageRef);

      await uploadBytes(imageRef, img);
      downloadURL = await getDownloadURL(imageRef);
      await updateDoc(docRef, {
        imageUrl: downloadURL,
      });
    }
    // const userImagesRef = ref(storage, "users", "images");
    // const imageName = `${img + v4() + "_" + userId + "_"}`;
    // const imageRef = ref(userImagesRef, imageName);
    // console.log("imageRef: ", imageRef);

    // await uploadBytes(imageRef, img);
    // downloadURL = await getDownloadURL(imageRef);
    // await updateDoc(docRef, {
    //   imageUrl: downloadURL,
    // });

    console.log("Document written with ID: ", docRef.id);
    alert("Your recipe has been added successfully");

    return docRef.id;
  } catch (error) {
    console.error("Error in addDish: ", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// export const uploadImage = (userId, img) => {
//   if (img == null) {
//     return;
//   }
//   const userImagesRef = ref(storage, "users", "images");
//   const imageName = `${img + v4() + "_" + userId}`;
//   const imageRef = ref(userImagesRef, imageName);
//   console.log("imageRef: ", imageRef);

//   uploadBytes(imageRef, img).then(async () => {
//     const downloadURL = await getDownloadURL(imageRef);
//     try {
//       const docRef = await doc(
//         db,
//         "users",
//         userId,
//         "dishes",
//         "bAbmk2wsrxj5UZYSF6jI"
//       );
//       await updateDoc(docRef, {
//         imageUrl: downloadURL,
//       });
//     } catch (error) {
//       console.error("Error in uploadImage: ", error);
//     }
//     alert("Image uploaded successfully");
//   });
// };

export const getDishes = async (userId) => {
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
