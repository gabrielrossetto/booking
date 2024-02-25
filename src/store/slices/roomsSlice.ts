import { createSlice } from '@reduxjs/toolkit';
import { mockRooms } from '../../services/mockData';
import { Room as RoomType } from '../../types/room';

interface RoomsState {
  rooms: RoomType[];
  loading: boolean;
}

const initialState: RoomsState = {
  rooms: mockRooms,
  loading: false,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    fetchRoomsStartReducer(state) {
      state.loading = true;
    },
    fetchRoomsSuccessReducer(state) {
      state.loading = false;
    },
    fetchRoomsByDatesReducer(state, action) {
      const { rooms, checkInDate, checkOutDate } = action.payload;
      const filteredRooms = rooms.filter((room: RoomType) => {
        return !room.bookedDates.some(({ startDate, endDate }) => {
          return startDate <= checkOutDate && endDate >= checkInDate;
        });
      });
      state.rooms = filteredRooms;
    },
    addBookingDatesReducer(state, action) {
      const { selectedRoom, checkInDate, checkOutDate } = action.payload;
      const room = state.rooms.find((room: RoomType) => room.id === selectedRoom.id);
      if (room) {
        room.bookedDates.push({ startDate: checkInDate, endDate: checkOutDate });
      }
    },
    editBookingDatesReducer(state, action) {
      const { checkInDate, checkOutDate, selectedRoom, currentCheckInDate, currentCheckOutDate } = action.payload;

      const roomIndex = state.rooms.findIndex((room: RoomType) => room.id === selectedRoom.id);

      if (roomIndex !== -1) {
        const room = state.rooms[roomIndex];

        const currentBookingIndex = room.bookedDates.findIndex(({ startDate, endDate }) => {
          return startDate === currentCheckInDate && endDate === currentCheckOutDate;
        });

        if (currentBookingIndex !== -1) {
          room.bookedDates.splice(currentBookingIndex, 1);
          room.bookedDates.push({ startDate: checkInDate, endDate: checkOutDate });
        }

        state.rooms[roomIndex] = room;
      }
    }
  },
});

export const { fetchRoomsStartReducer, fetchRoomsSuccessReducer, fetchRoomsByDatesReducer, addBookingDatesReducer, editBookingDatesReducer } = roomsSlice.actions;

export default roomsSlice.reducer;