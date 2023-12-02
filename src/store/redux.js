import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import userSlice from "./user/userSlice";
import thunk from "redux-thunk";
import productSlice from "./product/productSlice";
const commont = {
  storage,
  stateConciler: autoMergeLevel2,
};
const autoConfig = {
  ...commont,
  key: "auth",
  whitelist: ["isLogginned", "token"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(autoConfig, userSlice),
    product: productSlice,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
