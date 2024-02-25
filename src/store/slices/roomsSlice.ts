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
    editBookingDatesReducer(state, action) {
      const { checkInDate, checkOutDate, selectedRoom, currentCheckInDate, currentCheckOutDate } = action.payload;

      const roomIndex = state.rooms.findIndex(room => room.id === selectedRoom.id);

      if (roomIndex !== -1) {
        const room = state.rooms[roomIndex];

        const currentCheckInDateIndex = room.bookedDates.indexOf(currentCheckInDate);
        if (currentCheckInDateIndex !== -1) {
          room.bookedDates.splice(currentCheckInDateIndex, 1);
        }

        const currentCheckOutDateIndex = room.bookedDates.indexOf(currentCheckOutDate);
        if (currentCheckOutDateIndex !== -1) {
          room.bookedDates.splice(currentCheckOutDateIndex, 1);
        }

        room.bookedDates.push(checkInDate);
        room.bookedDates.push(checkOutDate);

        state.rooms[roomIndex] = room;
      }
    }
  },
});

export const { fetchRoomsStartReducer, fetchRoomsSuccessReducer, fetchRoomsFailureReducer, fetchRoomsByDatesReducer, addBookingDatesReducer, editBookingDatesReducer } = roomsSlice.actions;

export default roomsSlice.reducer;