import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerAuthThunk = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = {
        email: email,
        userName: name,
        token: user.uid,
        isLoggedIn: true,
      };
      return userData;
    } catch (error) {
      throw error;
    }
  }
);

export const logInAuthThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userData = {
        email: email,
        token: user.uid,
        isLoggedIn: true,
      };
      return userData;
    } catch (error) {
      throw error;
    }
  }
);

export const logOutAuthThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await signOut(auth);
    await AsyncStorage.clear();
    return;
  } catch (error) {
    throw error;
  }
});
