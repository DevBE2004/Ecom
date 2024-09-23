import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import productSlice from "./product/productSlice";
import storage from "redux-persist/lib/storage";
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
import userSlice from "./user/userSlice";

const commonConfig = {
  storage,
};
const userConfig = {
  ...commonConfig,
  whitelist: ["isLogin", "token", "current", "currentCart"],
  key: "shop/user",
};

const productConfig = {
  ...commonConfig,
  whitelist: ["dealDaily"],
  key: "shop/deal",
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    product: persistReducer(productConfig, productSlice),
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
