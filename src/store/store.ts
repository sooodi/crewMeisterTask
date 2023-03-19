import { configureStore } from "@reduxjs/toolkit";
import filterDataSlice from "./filterDataSlice";
import absenceDataSlice from "./absenceDataSlice";
import memberDataSlice from "./memberDataSlice";

const store = configureStore({
  reducer: {
    filterData: filterDataSlice.reducer,
    absenceData: absenceDataSlice.reducer,
    memberData: memberDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
