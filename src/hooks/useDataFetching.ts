import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingsStart, addBooking } from '../store/slices/bookingsSlice';
import { fetchRoomsStart } from '../store/slices/roomsSlice';

const useDataFetching = () => {
  const dispatch = useDispatch();
  //TODO: typescript
  const { bookings, loading: bookingsLoading, error: bookingsError } = useSelector((state) => state.bookings);
  //TODO: typescript
  const { rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchBookingsStart());
    dispatch(fetchRoomsStart());
  }, [dispatch]);

  //TODO: typescript
  const handleAddBooking = (newBooking) => {
    dispatch(addBooking(newBooking));
  };

  return {
    bookings,
    rooms,
    bookingsLoading,
    roomsLoading,
    bookingsError,
    roomsError,
    handleAddBooking,
  };
};

export default useDataFetching;