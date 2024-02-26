/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Container, Typography, Box } from '@mui/material';
import moment from 'moment';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import useDataFetching from '../../hooks/useDataFetching';
import useBookingValidation from '../../hooks/useBookingValidation';
import Perks from '../../components/Perks/Perks';
import Divider from '../../components/Divider/Divider';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { Room as RoomType } from '../../types/room';
import { ValidateBooking as ValidateBookingType } from '../../types/validatebooking';

const Room = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { rooms, handleAddBooking, handleEditBooking, fetchRooms, getBookingByRoomId } = useDataFetching();
  const { validateBooking } = useBookingValidation();
  const [searchParams] = useSearchParams();
  const currentCheckInDate = searchParams.get("checkInDate");
  const currentCheckOutDate = searchParams.get("checkOutDate");
  const isEditMode = searchParams.get("edit");
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const selectedRoom: RoomType | undefined = rooms.find((room) => room.id === id);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (currentCheckInDate && currentCheckOutDate) {
      setCheckInDate(moment(currentCheckInDate));
      setCheckOutDate(moment(currentCheckOutDate));
    }
  }, [currentCheckInDate, currentCheckOutDate]);

  if (!selectedRoom) {
    return;
  }
  const { description, imageUrl, name, location, perks } = selectedRoom;

  const handleBookButtonAction = () => {
    const error = validateBooking({ checkInDate, checkOutDate, roomId: id, isEditMode } as ValidateBookingType)

    if (error) {
      toast.error(error);
    } else {
      if (isEditMode && id) {
        const selectedBooking = getBookingByRoomId(id);
        if (selectedBooking) {
          handleEditBooking({
            checkInDate: moment(checkInDate).format('YYYY-MM-DD'),
            checkOutDate: moment(checkOutDate).format('YYYY-MM-DD'),
            selectedRoom,
            bookingId: selectedBooking.id
          });
        }
      } else {
        handleAddBooking({
          checkInDate: moment(checkInDate).format('YYYY-MM-DD'),
          checkOutDate: moment(checkOutDate).format('YYYY-MM-DD'),
          selectedRoom
        });
      }
      navigate("/");
    }
  }

  return (
    <Container className="flex flex-col items-center mt-5">
      <Typography className="font-bold text-black" variant="h4">{name}</Typography>

      <Box className="flex flex-col w-full md:flex-row md:justify-between md:h-96">
        <img className="object-cover w-full mb-4 rounded-lg md:mb-0" src={imageUrl} alt="Main" />
      </Box>

      <Box className="flex flex-col justify-between w-full mt-5 md:flex-row">
        <Box className="w-full md:w-8/12">
          <Typography className="font-bold text-black" variant="h6">{location}</Typography>
          <Typography className="font-bold text-default" variant="subtitle1">{description}</Typography>
          <Divider />
          {perks.length > 0 && (
            <Perks perks={perks} />
          )}
        </Box>
        <Box className="flex flex-col items-center justify-center w-full gap-8 p-4 mt-2 border rounded-lg shadow-xl md:w-4/12">
          <DatePicker
            label="Check-in"
            value={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            disablePast
            className="mb-4"
          />
          <DatePicker
            label="Check-out"
            value={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            disablePast
            minDate={checkInDate}
            className="mb-4"
          />
          <PrimaryButton className="w-full md:w-4/5" text={`${isEditMode ? 'Update Booking' : 'Book'}`} onClick={handleBookButtonAction} />
        </Box>
      </Box>
    </Container>
  );
};

export default Room;
