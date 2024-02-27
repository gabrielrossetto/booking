import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { MyBookings as MyBookingsType } from '../../types/mybookings';
import PrimaryButton from '../Buttons/PrimaryButton';

const MyBookingsCard = ({ booking, handleDeleteBooking, handleUpdate }: { booking: MyBookingsType, handleDeleteBooking: (id: string) => void, handleUpdate: (roomId: string, checkInDate: string, checkOutDate: string) => void }) => {
  return (
    <Card className="w-full mb-4 rounded-lg">
      <CardContent className="flex justify-between">
        <Box className="flex items-center w-8/12">
          <Box>
            <Typography className="font-bold text-black" variant="h6">{booking.roomDetails?.name}</Typography>
            <Typography className="font-bold text-default" variant="subtitle1">{booking.roomDetails?.location}</Typography>
            <Typography className="font-bold text-default" variant="subtitle1">Check-in: {booking.checkInDate}</Typography>
            <Typography className="font-bold text-default" variant="subtitle1">Check-out: {booking.checkOutDate}</Typography>
            <Typography className="font-bold text-default" variant="subtitle1">Price per night: ${booking.roomDetails?.pricePerNight}</Typography>
          </Box>
        </Box>

        <Box className="flex flex-col items-center justify-center w-1/3 gap-4">
          <PrimaryButton className="w-3/5 md:w-4/6 bg-warning border-red-950 hover:bg-warning-dark" text="Delete" onClick={() => handleDeleteBooking(booking.id)} />
          <PrimaryButton className="w-3/5 md:w-4/6" text="Update" onClick={() => handleUpdate(booking.roomId, booking.checkInDate, booking.checkOutDate)} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyBookingsCard;
