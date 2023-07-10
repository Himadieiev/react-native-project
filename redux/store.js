import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postsReducer } from "./Posts/postsSlice";
import { authReducer } from "./Auth/authSlice";
import { createLogger } from "redux-logger";

const persistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["token"],
};

const logger = createLogger();

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    return [...middleware, logger];
  },
});

export const persistor = persistStore(store);
