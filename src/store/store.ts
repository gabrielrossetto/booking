import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from './slices/bookingsSlice';
import roomsReducer from './slices/roomsSlice';

const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    rooms: roomsReducer,
  },
});

export default store;