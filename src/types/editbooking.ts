import { Room as RoomType } from "./room";

export interface EditBookingPayload {
  checkInDate: string;
  checkOutDate: string;
  selectedRoom?: RoomType;
  bookingId: string;
}