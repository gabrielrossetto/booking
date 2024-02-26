import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBookingsStartReducer,
  fetchBookingsSuccessReducer,
  addBookingReducer,
  deleteBookingReducer,
  editBookingReducer,
  fetchBookingsErrorReducer,
} from '../store/slices/bookingsSlice';
import {
  fetchRoomsStartReducer,
  fetchRoomsSuccessReducer,
  fetchRoomsErrorReducer,
} from '../store/slices/roomsSlice';
import { EditBookingPayload as EditBookingPayloadType } from '../types/editbooking';
import { AddBookingPayload as AddBookingPayloadType } from '../types/addbookingpayload';
import { FilterRooms as FilterRoomsType } from '../types/filterrooms';
import { RootState as RootStateType } from '../store/store';
import { Room as RoomType } from '../types/room';
import { Booking as BookingType } from '../types/booking';
import moment from 'moment';

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

    fetch("http://localhost:3000/bookings")
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchBookingsSuccessReducer(data));
      })
      .catch(() => {
        dispatch(fetchBookingsErrorReducer());
      });
  }

  const fetchRooms = async () => {
    dispatch(fetchRoomsStartReducer());

    return await fetch("http://localhost:3000/rooms")
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchRoomsSuccessReducer(data));
      })
      .catch(() => {
        dispatch(fetchRoomsErrorReducer());
      });
  }

  const filterRooms = ({ checkInDate, checkOutDate }: FilterRoomsType) => {
    const reservedRoomIds = bookings
      .filter(booking => {
        return (
          moment(checkInDate).isBefore(booking.checkOutDate) &&
          moment(checkOutDate).isAfter(booking.checkInDate)
        );
      })
      .map(booking => booking.roomId);

    const availableRooms = rooms.filter(room => !reservedRoomIds.includes(room.id));

    return availableRooms;
  }

  const handleAddBooking = ({ checkInDate, checkOutDate, selectedRoom }: AddBookingPayloadType) => {
    const formattedBooking = { checkInDate, checkOutDate, roomId: selectedRoom.id };

    fetch("http://localhost:3000/bookings", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedBooking),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addBookingReducer(data));
      })
      .catch(() => {
        dispatch(fetchBookingsErrorReducer());
      });
  };

  const handleEditBooking = ({ checkInDate, checkOutDate, selectedRoom, bookingId }: EditBookingPayloadType) => {
    const formattedBooking = { checkInDate, checkOutDate, roomId: selectedRoom.id };

    fetch(`http://localhost:3000/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedBooking),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(editBookingReducer());
      })
      .catch(() => {
        dispatch(fetchBookingsErrorReducer());
      });
  };

  const handleDeleteBooking = (bookingId: string) => {
    fetch(`http://localhost:3000/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(deleteBookingReducer({ bookingId }));
      })
      .catch(() => {
        dispatch(fetchBookingsErrorReducer());
      });
  };

  const getBookingByRoomId = (roomId: string) => {
    return bookings.find(booking => booking.roomId === roomId);
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
    handleEditBooking,
    getBookingByRoomId
  };
};

export default useDataFetching;