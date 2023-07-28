import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  arrayUnion,
  updateDoc,
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
    const posts = await getDocs(collection(db, "posts"));
    const collectionData = [];
    posts.forEach((doc) => {
      collectionData.push({ id: doc.id, ...doc.data() });
    });
    return collectionData;
  } catch (error) {
    throw new Error("No posts");
  }
});

export const createLike = createAsyncThunk("posts/like", () => {});

export const createCommentThunk = createAsyncThunk(
  "comments/createComment",
  async (newComment) => {
    try {
      const { postId, ...commentData } = newComment;
      const ref = doc(db, "posts", postId);
      await updateDoc(ref, {
        comments: arrayUnion(commentData),
      });

      return { postId, ...commentData };
    } catch (error) {
      throw new Error("Не вдалося додати коментар");
    }
  }
);
