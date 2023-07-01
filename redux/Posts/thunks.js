import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export const createPostThunk = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), postData);
      return { id: docRef.id, ...postData };
    } catch (error) {
      throw new Error("Не вдалося створити публікацію");
    }
  }
);

export const deletePostThunk = createAsyncThunk(
  "posts/delete",
  async (collectionName, documentId) => {
    const docRef = doc(collection(db, collectionName), documentId);

    try {
      await deleteDoc(docRef);
      console.log("Документ успішно видалено");
    } catch (error) {
      console.log("Помилка видалення документа", error);
    }
  }
);

export const getPostsThunk = createAsyncThunk("posts/getPosts", async () => {
  try {
    const collectionSnapshot = await getDocs(collection(db, "posts"));
    const collectionData = collectionSnapshot.docs.map((doc) => doc.data());
    return collectionData;
  } catch (error) {
    throw new Error("No posts");
  }
});

export const createLike = createAsyncThunk("posts/like", () => {});

export const createComment = createAsyncThunk("posts/comment", () => {});
