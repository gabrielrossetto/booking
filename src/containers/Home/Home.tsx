/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import useDataFetching from '../../hooks/useDataFetching';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import RoundSearchButton from '../../components/Buttons/RoundSearchButton';
import { NumericFormat } from 'react-number-format';
import { Room as RoomType } from '../../types/room';

const HomePage = () => {
  const { rooms, fetchRooms, filterRooms } = useDataFetching();
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const handleSearch = () => {
    filterRooms({
      checkInDate: moment(checkInDate).format('YYYY-MM-DD'),
      checkOutDate: moment(checkOutDate).format('YYYY-MM-DD')
    });
  };

  useEffect(() => {
    fetchRooms();
  }, [])

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
          className="text-pink-400"
        />
        <RoundSearchButton onClick={handleSearch} />
      </Box>

      {rooms && rooms.length > 0 && (
        <Box className="flex flex-wrap justify-center">
          {rooms?.map((room: RoomType) => {
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
