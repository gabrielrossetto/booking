import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingsStartReducer, fetchBookingsSuccessReducer, addBookingReducer, deleteBookingReducer, editBookingReducer } from '../store/slices/bookingsSlice';
import { fetchRoomsStartReducer, fetchRoomsSuccessReducer, fetchRoomsByDatesReducer, addBookingDatesReducer, editBookingDatesReducer } from '../store/slices/roomsSlice';
import { v4 as uuidv4 } from 'uuid';
import { EditBookingPayload as EditBookingPayloadType } from '../types/editbooking';
import { AddBookingPayload as AddBookingPayloadType } from '../types/addbookingpayload';
import { FilterRooms as FilterRoomsType } from '../types/filterrooms';
import { RootState as RootStateType } from '../store/store';
import { Room as RoomType } from '../types/room';
import { Booking as BookingType } from '../types/booking';

const useDataFetching = () => {
  const dispatch = useDispatch();

  const { bookings, loading: bookingsLoading } = useSelector((state: RootStateType) => state.bookings);
  const { rooms, loading: roomsLoading } = useSelector((state: RootStateType) => state.rooms);

  const bookingsWithRoomDetails = bookings.map((booking: BookingType) => {
    const room = rooms.find((room: RoomType) => room.id === booking.roomId);
    return {
      ...booking,
      roomDetails: room
    };
  });

  const fetchBookings = () => {
    dispatch(fetchBookingsStartReducer());

    // Faking the API call
    dispatch(fetchBookingsSuccessReducer());
  }

  const fetchRooms = () => {
    dispatch(fetchRoomsStartReducer());

    // Faking the API call
    dispatch(fetchRoomsSuccessReducer());
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