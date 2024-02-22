import styled from 'styled-components';
import { Container, Typography } from '@mui/material';
import useDataFetching from '../../hooks/useDataFetching';

const RoomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MainImage = styled.img`
  width: 50%;
`;

const SmallImageContainer = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
`;

const SmallImage = styled.img`
  width: 48%;
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const LeftContent = styled.div`
  width: 70%;
`;

const RightContent = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const Room = () => {
  const { handleAddBooking } = useDataFetching();

  return (
    <RoomContainer>
      <Title variant="h4">Brazil Brazil Brazil</Title>

      <button onClick={() => { handleAddBooking({ id: '3', roomId: '1', checkInDate: '2024-02-22', checkOutDate: '2024-02-25' }) }}>ADD</button>

      <ImagesContainer>
        <MainImage src="https://via.placeholder.com/400x300" alt="Main" />
        <SmallImageContainer>
          <SmallImage src="https://via.placeholder.com/150" alt="Small1" />
          <SmallImage src="https://via.placeholder.com/150" alt="Small2" />
          <SmallImage src="https://via.placeholder.com/150" alt="Small3" />
          <SmallImage src="https://via.placeholder.com/150" alt="Small4" />
        </SmallImageContainer>
      </ImagesContainer>
      <ContentContainer>
        <LeftContent>
          <Typography variant="h6">Random text</Typography>
          <Typography variant="body1">Random text</Typography>
          <Typography variant="body1">Random text</Typography>
          <Typography variant="body1">Random text</Typography>
        </LeftContent>
        <RightContent>
          <div>
            <Typography variant="body1">Check-in</Typography>
            <Typography variant="body1">Check-out</Typography>
            <Typography variant="body1">Quantity</Typography>
          </div>
          <div>
            <Typography variant="body1">Text 1</Typography>
            <Typography variant="body1">Text 1</Typography>
            <Typography variant="body1">Text 1</Typography>
          </div>
          <button>Book</button>
        </RightContent>
      </ContentContainer>
    </RoomContainer>
  );
};

export default Room;
