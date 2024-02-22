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
    fetchBookingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBookingsSuccess(state) {
      state.loading = false;
    },
    fetchBookingsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
  },
});

export const { fetchBookingsStart, fetchBookingsSuccess, fetchBookingsFailure, addBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;
