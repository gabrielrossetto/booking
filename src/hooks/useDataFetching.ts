import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingsStartReducer, addBookingReducer, deleteBookingReducer, editBookingReducer } from '../store/slices/bookingsSlice';
import { fetchRoomsStartReducer, fetchRoomsByDatesReducer, addBookingDatesReducer, editBookingDatesReducer } from '../store/slices/roomsSlice';
import { v4 as uuidv4 } from 'uuid';
import { EditBookingPayload as EditBookingPayloadType } from '../types/editbooking';
import { AddBookingPayload as AddBookingPayloadType } from '../types/addbooking';
import { FilterRooms as FilterRoomsType } from '../types/filterrooms';

const useDataFetching = () => {
  const dispatch = useDispatch();
  //TODO: typescript
  const { bookings, loading: bookingsLoading, error: bookingsError } = useSelector((state) => state.bookings);
  //TODO: typescript
  const { rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);

  //TODO: typescript 
  const bookingsWithRoomDetails = bookings.map(booking => {
    const room = rooms.find(room => room.id === booking.roomId);
    return {
      ...booking,
      roomDetails: room
    };
  });

  const fetchBookings = () => {
    dispatch(fetchBookingsStartReducer());
  }

  const fetchRooms = () => {
    dispatch(fetchRoomsStartReducer());
  }

  const filterRooms = ({ checkInDate, checkOutDate }: FilterRoomsType) => {
    dispatch(fetchRoomsByDatesReducer({ rooms, checkInDate, checkOutDate }));
  }

  const handleAddBooking = ({ checkInDate, checkOutDate, selectedRoom }: AddBookingPayloadType) => {
    dispatch(addBookingDatesReducer({ checkInDate, checkOutDate, selectedRoom }));

    const bookingId = uuidv4();
    const formattedBooking = { checkInDate, checkOutDate, roomId: selectedRoom.id, id: bookingId, };
    dispatch(addBookingReducer({ ...formattedBooking }));
  };

  const handleEditBooking = ({ checkInDate, checkOutDate, selectedRoom, currentCheckInDate, currentCheckOutDate }: EditBookingPayloadType) => {
    dispatch(editBookingDatesReducer({ checkInDate, checkOutDate, selectedRoom, currentCheckInDate, currentCheckOutDate }));
    dispatch(editBookingReducer({ checkInDate, checkOutDate, selectedRoom }));
  };

  const handleDeleteBooking = (bookingId: string) => {
    dispatch(deleteBookingReducer({ bookingId }));
  };

  return {
    bookings,
    rooms,
    bookingsLoading,
    roomsLoading,
    bookingsError,
    roomsError,
    handleAddBooking,
    fetchRooms,
    fetchBookings,
    filterRooms,
    bookingsWithRoomDetails,
    handleDeleteBooking,
    handleEditBooking
  };
};

export default useDataFetching;