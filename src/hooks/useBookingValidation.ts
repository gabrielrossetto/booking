import { useSelector } from 'react-redux';
import moment from 'moment';
import { ValidateBooking as ValidateBookingType } from '../types/validatebooking';
import { Room as RoomType } from '../types/room';
import { RootState as RootStateType } from '../store/store';

const useBookingValidation = () => {
  const { rooms } = useSelector((state: RootStateType) => state.rooms);

  const validateBooking = ({ checkInDate, checkOutDate, roomId, isEditMode }: ValidateBookingType) => {
    const room = rooms.find((room: RoomType) => room?.id === roomId);

    if (!checkInDate || !checkOutDate) {
      return "Please, select the dates.";
    }

    if (!room) {
      return "Room not found.";
    }

    if (!room.bookedDates) {
      return null;
    }

    const checkInMoment = moment(checkInDate);
    const checkOutMoment = moment(checkOutDate);

    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
      return "Checkout date cannot be before or the same as the check-in date.";
    }

    const checkInString = checkInMoment.format('YYYY-MM-DD');
    const checkOutString = checkOutMoment.format('YYYY-MM-DD');

    if (!isEditMode && room.bookedDates.some(({ startDate, endDate }: { startDate: string, endDate: string }) => {
      return (startDate <= checkInString && endDate >= checkInString) || (startDate <= checkOutString && endDate >= checkOutString);
    })) {
      return "Date already booked, pick another one.";
    }

    return null;
  };

  return {
    validateBooking
  };
};

export default useBookingValidation;
