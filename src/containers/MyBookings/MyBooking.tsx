import styled from 'styled-components';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import useDataFetching from '../../hooks/useDataFetching';

const MyBookingsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
`;

const BookingList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookingCard = styled(Card)`
  margin: 10px;
  border-radius: 8px;
  width: 100%;
`;

const BookingCardContent = styled(CardContent)`
  display: flex;
  justify-content: space-between;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MyBookings = () => {
  const { bookings } = useDataFetching();

  return (
    <MyBookingsContainer>
      <Title variant="h4">My Bookings</Title>
      <BookingList>
        {/* TODO: Typescript */}
        {bookings.map(booking => (
          <BookingCard key={booking.id}>
            <BookingCardContent>
              <LeftContent>
                <CardMedia
                  component="img"
                  image={booking.imageUrl}
                  alt="Booking img"
                  // TODO: Styled components
                  style={{ width: '150px', borderRadius: '8px' }}
                />
                <div>
                  <Typography variant="h6">{booking.location}</Typography>
                  <Typography variant="body1">{booking.date}</Typography>
                  <Typography variant="body1">{booking.price}</Typography>
                </div>
              </LeftContent>
              <RightContent>
                <Typography variant="body1">Text price</Typography>
              </RightContent>
            </BookingCardContent>
          </BookingCard>
        ))}
      </BookingList>
    </MyBookingsContainer>
  );
};

export default MyBookings;
