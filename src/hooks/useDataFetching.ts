import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingsStartReducer, addBookingReducer, deleteBookingReducer } from '../store/slices/bookingsSlice';
import { fetchRoomsStartReducer, fetchRoomsByDatesReducer, addBookingDatesReducer } from '../store/slices/roomsSlice';
import { v4 as uuidv4 } from 'uuid';

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

  const filterRooms = (checkInDate: string, checkOutDate: string) => {
    dispatch(fetchRoomsByDatesReducer({ rooms, checkInDate, checkOutDate }));
  }
  //TODO: typescript
  const handleAddBooking = (checkInDate: string, checkOutDate: string, selectedRoom) => {
    dispatch(addBookingDatesReducer({ checkInDate, checkOutDate, selectedRoom }));

    const bookingId = uuidv4();
    const formattedBooking = { checkInDate, checkOutDate, roomId: selectedRoom.id, id: bookingId, };
    dispatch(addBookingReducer({ ...formattedBooking }));
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
  };
};

export default useDataFetching;