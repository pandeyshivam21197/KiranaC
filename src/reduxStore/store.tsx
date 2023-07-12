import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import homeReducer from "./reducers/homeReducer";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["homeReducer"],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({ homeReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
