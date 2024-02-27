import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Room as RoomType } from '../../types/room';
import moment from 'moment';
import { NumericFormat } from 'react-number-format';

const RoomCard = ({ room, checkInDate, checkOutDate }: { room: RoomType, checkInDate: Date | null, checkOutDate: Date | null }) => {
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
  );
};

export default RoomCard;
