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
    fetchRoomsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRoomsSuccess(state) {
      state.loading = false;
    },
    fetchRoomsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRoomsStart, fetchRoomsSuccess, fetchRoomsFailure } = roomsSlice.actions;

export default roomsSlice.reducer;
