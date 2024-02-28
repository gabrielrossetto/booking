import { createSlice } from '@reduxjs/toolkit';
import { Booking as BookingType } from '../../types/booking';
import { toast } from 'react-toastify';
interface BookingsState {
  bookings: BookingType[];
  loading: boolean;
  error: boolean;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: false
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    fetchBookingsStartReducer(state) {
      state.loading = true;
    },
    fetchBookingsSuccessReducer(state, action) {
      state.loading = false;
      state.bookings = action.payload;
      state.error = false;
    },
    fetchBookingsErrorReducer(state) {
      state.loading = false;
      state.error = true;
    },
    addBookingReducer(state, action) {
      state.loading = false;
      state.bookings.push(action.payload);
      toast.success("Room successfully booked.");
    },
    deleteBookingReducer(state, action) {
      state.loading = false;
      state.bookings = state.bookings.filter((booking: BookingType) => booking.id !== action.payload.bookingId);
      toast.success("Room successfully deleted.");
    },
    editBookingReducer(state, action) {
      state.loading = false;
      const index = state.bookings.findIndex((booking: BookingType) => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
        toast.success("Room successfully updated.");
      }
    }
  },
});

export const { fetchBookingsStartReducer, fetchBookingsSuccessReducer, fetchBookingsErrorReducer, addBookingReducer, deleteBookingReducer, editBookingReducer } = bookingsSlice.actions;

export default bookingsSlice.reducer;
