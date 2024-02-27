import { Room as RoomType } from "./room";

export interface MyBookings {
  id: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  roomDetails?: RoomType
}