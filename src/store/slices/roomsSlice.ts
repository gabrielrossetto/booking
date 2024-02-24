import { createSlice } from '@reduxjs/toolkit';
import { mockRooms } from '../../services/mockData';

const initialState = {
  rooms: mockRooms,
  loading: false,
  error: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    fetchRoomsStartReducer(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRoomsSuccessReducer(state, action) {
      state.loading = false;
      state.rooms = action.payload;
    },
    fetchRoomsFailureReducer(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRoomsByDatesReducer(state, action) {
      const { rooms, checkInDate, checkOutDate } = action.payload;
      const filteredRooms = rooms.filter((room) => {
        return !room.bookedDates.some(date => date >= checkInDate && date <= checkOutDate);
      });
      state.rooms = filteredRooms;
    },
    addBookingDatesReducer(state, action) {
      const { selectedRoom, checkInDate, checkOutDate } = action.payload;
      const room = state.rooms.find(room => room.id === selectedRoom.id);
      if (room) {
        room.bookedDates.push(checkInDate);
        room.bookedDates.push(checkOutDate);
      }
    },
  },
});

export const { fetchRoomsStartReducer, fetchRoomsSuccessReducer, fetchRoomsFailureReducer, fetchRoomsByDatesReducer, addBookingDatesReducer } = roomsSlice.actions;

export default roomsSlice.reducer;