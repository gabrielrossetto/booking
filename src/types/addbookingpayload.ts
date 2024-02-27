import { Room as RoomType } from "./room";

export interface AddBookingPayload {
  checkInDate: string;
  checkOutDate: string;
  selectedRoom?: RoomType;
}