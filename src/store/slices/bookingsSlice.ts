import { createSlice } from '@reduxjs/toolkit';
import { mockBookings } from '../../services/mockData';

const initialState = {
  bookings: mockBookings,
  loading: false,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    fetchBookingsStartReducer(state) {
      state.loading = true;
    },
    fetchBookingsSuccessReducer(state) {
      state.loading = false;
    },
    addBookingReducer(state, action) {
      state.bookings.push(action.payload);
    },
    deleteBookingReducer(state, action) {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload.bookingId);
    },
    editBookingReducer(state, action) {
      const { checkInDate, checkOutDate, selectedRoom } = action.payload;

      const index = state.bookings.findIndex(booking => booking.roomId === selectedRoom.id);

      if (index !== -1) {
        state.bookings[index] = { ...state.bookings[index], checkInDate, checkOutDate };
      }
    }
  },
});

export const { fetchBookingsStartReducer, fetchBookingsSuccessReducer, addBookingReducer, deleteBookingReducer, editBookingReducer } = bookingsSlice.actions;

export default bookingsSlice.reducer;
