import { useSelector } from 'react-redux';
import moment from 'moment';

const useBookingValidation = () => {
  const { rooms } = useSelector((state) => state.rooms);

  const validateBooking = ({ checkInDate, checkOutDate, roomId, isEditMode }) => {
    const room = rooms.find(room => room?.id === roomId);

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

    if (!isEditMode && room.bookedDates.some(({ startDate, endDate }) => {
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
