/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import useDataFetching from '../../hooks/useDataFetching';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import RoundSearchButton from '../../components/Buttons/RoundSearchButton';
import { NumericFormat } from 'react-number-format';
import { Room as RoomType } from '../../types/room';

const HomePage = () => {
  const { rooms, fetchRooms, filterRooms, roomsLoading } = useDataFetching();
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [filteredRooms, setFilteredRooms] = useState<RoomType[]>([]);

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

  useEffect(() => {
    if (!rooms.length) {
      fetchRooms();
    } else {
      setFilteredRooms(rooms);
    }
  }, []);

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
      {filteredRooms && filteredRooms.length > 0 && (
        <Box className="flex flex-wrap justify-center">
          {roomsLoading && <CircularProgress />}
          {!roomsLoading && filteredRooms?.map((room: RoomType) => {
            const { location, imageUrl, name, pricePerNight } = room;
            return (
              <Link to={checkInDate && checkOutDate ? `/room/${room.id}?checkInDate=${moment(checkInDate).format('YYYY-MM-DD')}&checkOutDate=${moment(checkOutDate).format('YYYY-MM-DD')}` : `/room/${room.id}`} key={room.id}>
                <Card className="w-64 m-4" key={room.id}>
                  <Box className="flex flex-col items-center">
                    <CardMedia
                      className="h-64"
                      component="img"
                      image={imageUrl}
                      alt="Placeholder"
                    />
                    <CardContent className="flex flex-col items-start">
                      <Typography variant="h6">{name}</Typography>
                      <Typography variant="body2">{location}</Typography>
                      <NumericFormat className="font-bold" prefix="$" value={pricePerNight} />
                    </CardContent>
                  </Box>
                </Card>
              </Link>
            )
          })}
        </Box>
      )}

    </Container>
  );
};

export default HomePage;
