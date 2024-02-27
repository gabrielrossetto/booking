import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import useDataFetching from '../../hooks/useDataFetching';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import RoundSearchButton from '../../components/Buttons/RoundSearchButton';
import { Room as RoomType } from '../../types/room';
import DataError from '../../components/DataError/DataError';
import RoomCard from '../../components/RoomCard/RoomCard';

const HomePage = () => {
  const { rooms, fetchRooms, roomsLoading, roomsError, bookingsError, filterRooms, fetchBookings } = useDataFetching();
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [filteredRooms, setFilteredRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [rooms, checkInDate, checkOutDate]);

  const handleSearch = () => {
    if (checkInDate && checkOutDate) {
      const availableRooms = filterRooms({
        checkInDate: moment(checkInDate).format('YYYY-MM-DD'),
        checkOutDate: moment(checkOutDate).format('YYYY-MM-DD')
      });
      setFilteredRooms(availableRooms);
    } else {
      setFilteredRooms(rooms);
    }
  };

  if (roomsError || bookingsError) {
    return <DataError />;
  }

  return (
    <Container className="flex flex-col items-center justify-center mt-4">
      <Box className="flex flex-col items-center justify-center gap-8 mb-4 md:flex-row md:items-center md:justify-center">
        <DatePicker
          label="Check-in"
          value={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          disablePast
        />
        <DatePicker
          label="Check-out"
          value={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          disablePast
          minDate={checkInDate}
        />
        <RoundSearchButton onClick={handleSearch} />
      </Box>
      {roomsLoading && <CircularProgress />}
      {filteredRooms && filteredRooms.length > 0 && (
        <Box className="flex flex-wrap justify-center">
          {filteredRooms.map((room: RoomType) => (
            <RoomCard key={room.id} room={room} checkInDate={checkInDate} checkOutDate={checkOutDate} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
