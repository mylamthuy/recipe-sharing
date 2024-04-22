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
  deleteDoc,
  getCountFromServer,
} from "firebase/firestore";
import { storage } from "../_utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const addDish = async (userId, dish, img) => {
  //console.log(img);
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

// Delete post
export const checkUserPost = async (userId, postId) => {
  try {
    const docRef = doc(db, "users", userId, "dishes", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Post exists for the user
      return true;
    } else {
      // Post does not exist for the user
      return false;
    }
  } catch (error) {
    console.error("Error checking user post:", error);
    return false; // Return false in case of any error
  }
};

export const deleteDish = async (userId, postId) => {
  try {
    const docRef = doc(db, "users", userId, "dishes", postId);
    await deleteDoc(docRef);
    alert("Recipe deleted successfully");
  } catch (error) {
    console.error("Error in deleteDish: ", error);
    throw error; // Rethrow the error to handle it in the component
  }
};


// Get user posts function
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

// Get all user IDs
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

// Get all posts
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

// Get post by ID
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