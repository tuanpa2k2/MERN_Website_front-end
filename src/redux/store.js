import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slides/productSlide";
import orderReducer from "./slides/orderSlide";
import useReducer from "./slides/userSlide";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["product", "user"], // khi reload lại, redux chỉ lưu state của thằng 'order' thôi, còn 'product & user' thì xóa
};

const rootReducer = combineReducers({
  product: productReducer,
  order: orderReducer,
  user: useReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
