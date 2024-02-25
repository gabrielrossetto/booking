import { createSlice } from '@reduxjs/toolkit';
import { mockBookings } from '../../services/mockData';
import { Booking as BookingType } from '../../types/booking';
import { toast } from 'react-toastify';
interface BookingsState {
  bookings: BookingType[];
  loading: boolean;
}

const initialState: BookingsState = {
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
      toast.success("Room successfully booked.");
    },
    deleteBookingReducer(state, action) {
      state.bookings = state.bookings.filter((booking: BookingType) => booking.id !== action.payload.bookingId);
      toast.success("Room successfully deleted.");
    },
    editBookingReducer(state, action) {
      const { checkInDate, checkOutDate, selectedRoom } = action.payload;

      const index = state.bookings.findIndex((booking: BookingType) => booking.roomId === selectedRoom.id);

      if (index !== -1) {
        state.bookings[index] = { ...state.bookings[index], checkInDate, checkOutDate };
        toast.success("Room successfully updated.");
      }
    }
  },
});

export const { fetchBookingsStartReducer, fetchBookingsSuccessReducer, addBookingReducer, deleteBookingReducer, editBookingReducer } = bookingsSlice.actions;

export default bookingsSlice.reducer;
