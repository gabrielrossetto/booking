import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import useDataFetching from '../../hooks/useDataFetching';
import DataError from "../../components/DataError/DataError";
import MyBookingsCard from "../../components/MyBookingsCard/MyBookingsCard";

const MyBookings = () => {
  const { bookingsWithRoomDetails, handleDeleteBooking, bookingsLoading, fetchBookings, fetchRooms, bookingsError, roomsError } = useDataFetching();

  const navigate = useNavigate();

  const handleUpdate = (roomId: string, checkInDate: string, checkOutDate: string) => {
    navigate(`/room/${roomId}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&edit=true`);
  };

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, []);

  if (bookingsError || roomsError) {
    return (
      <DataError />
    );
  }

  return (
    <Container className="flex flex-col items-center mt-4">
      {bookingsWithRoomDetails.length === 0 ? (
        <Box className="flex items-center justify-center mt-8">
          <Typography className="mt-4 font-bold text-black" variant="h4">No bookings</Typography>
        </Box>
      ) : (
        <>
          <Typography className="mt-4 font-bold text-black" variant="h4">My Bookings</Typography>
          <Box className="w-full">
            {bookingsLoading && <Box className="flex items-center justify-center"><CircularProgress /></Box>}
            {!bookingsLoading && bookingsWithRoomDetails.map((booking, index) => (
              <MyBookingsCard
                key={`booking-${index}`}
                booking={booking}
                handleDeleteBooking={handleDeleteBooking}
                handleUpdate={handleUpdate}
              />
            ))}
          </Box>
        </>
      )}
    </Container >
  );
};

export default MyBookings;
