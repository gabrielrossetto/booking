import { createSlice } from '@reduxjs/toolkit';
import { Room as RoomType } from '../../types/room';

interface RoomsState {
  rooms: RoomType[];
  loading: boolean;
  error: boolean;
}

const initialState: RoomsState = {
  rooms: [],
  loading: false,
  error: false
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    fetchRoomsStartReducer(state) {
      state.loading = true;
    },
    fetchRoomsSuccessReducer(state, action) {
      state.loading = false;
      state.rooms = action.payload;
      state.error = false;
    },
    fetchRoomsErrorReducer(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchRoomsStartReducer, fetchRoomsSuccessReducer, fetchRoomsErrorReducer } = roomsSlice.actions;

export default roomsSlice.reducer;