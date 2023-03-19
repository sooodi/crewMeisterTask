import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import filterDataSlice from "./filterDataSlice";

const store = configureStore({
  reducer: { filterData: filterDataSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
