export interface Room {
  id: string;
  location: string;
  description: string;
  imageUrl: string;
  perks: string[];
  name: string;
  pricePerNight: number;
  bookedDates: { startDate: string; endDate: string }[];

}