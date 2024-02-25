import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import useDataFetching from '../../hooks/useDataFetching';
import { Booking as BookingType } from '../../types/booking';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { bookingsWithRoomDetails, handleDeleteBooking } = useDataFetching();
  const navigate = useNavigate();

  const handleUpdate = (roomId: string, checkInDate: string, checkOutDate: string) => {
    navigate(`/room/${roomId}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&edit=true`);
  };

  return (
    <Container className="flex flex-col items-center mt-4">
      {bookingsWithRoomDetails.length === 0 ? (
        <Typography className="mt-4 font-bold text-black" variant="h4">No bookings</Typography>
      ) : (
        <>
          <Typography className="mt-4 font-bold text-black" variant="h4">My Bookings</Typography>
          <Box className="w-full">
            {bookingsWithRoomDetails.map((booking: BookingType, index: number) => (
              <Card className="w-full mb-4 rounded-lg" key={`booking-${index}`}>
                <CardContent className="flex justify-between">
                  <Box className="flex items-center w-8/12">
                    <Box>
                      <Typography className="font-bold text-black" variant="h6">{booking?.roomDetails?.name}</Typography>
                      <Typography className="font-bold text-default" variant="subtitle1">{booking?.roomDetails?.location}</Typography>
                      <Typography className="font-bold text-default" variant="subtitle1">Check-in: {booking?.checkInDate}</Typography>
                      <Typography className="font-bold text-default" variant="subtitle1">Check-out: {booking?.checkOutDate}</Typography>
                      <Typography className="font-bold text-default" variant="subtitle1">Price per night: ${booking?.roomDetails?.pricePerNight}</Typography>
                    </Box>
                  </Box>

                  <Box className="flex flex-col items-center justify-center w-1/3 gap-4">
                    <PrimaryButton className="w-4/6 bg-warning border-red-950 hover:bg-warning-dark" text="Delete" onClick={() => handleDeleteBooking(booking.id)} />
                    <PrimaryButton className="w-4/6" text="Update" onClick={() => handleUpdate(booking?.roomId, booking?.checkInDate, booking?.checkOutDate)} />                </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Container >
  );
};

export default MyBookings;
