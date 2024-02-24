import { createSlice } from '@reduxjs/toolkit';
import { mockBookings } from '../../services/mockData';

const initialState = {
  bookings: mockBookings,
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    fetchBookingsStartReducer(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBookingsSuccessReducer(state, action) {
      state.loading = false;
      state.bookings = action.payload;
    },
    fetchBookingsFailureReducer(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addBookingReducer(state, action) {
      state.bookings.push(action.payload);
    },
    deleteBookingReducer(state, action) {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload.bookingId);
    },
  },
});

export const { fetchBookingsStartReducer, fetchBookingsSuccessReducer, fetchBookingsFailureReducer, addBookingReducer, deleteBookingReducer } = bookingsSlice.actions;

export default bookingsSlice.reducer;
