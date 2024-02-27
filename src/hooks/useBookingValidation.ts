import { useSelector } from 'react-redux';
import moment from 'moment';
import { ValidateBooking as ValidateBookingType } from '../types/validatebooking';
import { Room as RoomType } from '../types/room';
import { RootState as RootStateType } from '../store/store';

const useBookingValidation = () => {
  const { rooms } = useSelector((state: RootStateType) => state.rooms);
  const { bookings } = useSelector((state: RootStateType) => state.bookings);

  const validateBooking = ({ checkInDate, checkOutDate, roomId, isEditMode }: ValidateBookingType) => {
    const room = rooms.find((room: RoomType) => room?.id === roomId);

    if (!checkInDate || !checkOutDate || !moment(checkInDate).isValid() || !moment(checkOutDate).isValid()) {
      return "Please, select the dates.";
    }

    if (!room) {
      return "Room not found.";
    }

    const checkInMoment = moment(checkInDate);
    const checkOutMoment = moment(checkOutDate);

    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
      return "Checkout date cannot be before or the same as the check-in date.";
    }

    if (isEditMode) {
      const hasBooking = bookings.some((booking) => booking.roomId === roomId);
      if (!hasBooking) {
        return "Cannot edit: no booking exists for this room.";
      }
    }

    const overlappingBooking = bookings.find((booking) => {
      const bookingCheckIn = moment(booking.checkInDate);
      const bookingCheckOut = moment(booking.checkOutDate);

      return (
        roomId === booking.roomId &&
        ((checkInMoment.isBetween(bookingCheckIn, bookingCheckOut, undefined, '[]') ||
          checkOutMoment.isBetween(bookingCheckIn, bookingCheckOut, undefined, '[]')) ||
          (bookingCheckIn.isBetween(checkInMoment, checkOutMoment, undefined, '[]') ||
            bookingCheckOut.isBetween(checkInMoment, checkOutMoment, undefined, '[]')))
      );
    });

    if (!isEditMode && overlappingBooking) {
      return "Date already booked, pick another one.";
    }

    return null;
  };

  return {
    validateBooking
  };
};

export default useBookingValidation;
