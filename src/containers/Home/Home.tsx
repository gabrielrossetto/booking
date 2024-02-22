import styled from 'styled-components';
import { Container, Button, TextField, Card, CardContent, CardMedia, Typography } from '@mui/material';
import useDataFetching from '../../hooks/useDataFetching';

const HomeContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 32px;
  padding: 10px 20px;
  margin-bottom: 20px;
`;

const SearchButton = styled(Button)`
  border-radius: 50%;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  margin: 10px;
  width: 250px;
`;

const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardImage = styled(CardMedia)`
  height: 200px;
`;

const HomePage = () => {
  const { rooms } = useDataFetching();

  return (
    <HomeContainer>
      <SearchBar>
        <TextField label="Local" variant="outlined" />
        <TextField label="Check-in" type="date" variant="outlined" />
        <TextField label="Check-out" type="date" variant="outlined" />
        <SearchButton variant="contained" color="primary">
          Search
        </SearchButton>
      </SearchBar>

      {rooms && rooms.length > 0 && (
        <CardList>
          {/* TODO: Typescript */}
          {rooms?.map((room) => (
            <StyledCard key={room.id}>
              <CardContentWrapper>
                <CardImage
                  component="img"
                  image="https://via.placeholder.com/250x200"
                  alt="Placeholder"
                />
                <CardContent>
                  <Typography variant="h6">Title</Typography>
                  <Typography variant="body2">Description</Typography>
                  <Typography variant="body2">Additional text text</Typography>
                </CardContent>
              </CardContentWrapper>
            </StyledCard>
          ))}
        </CardList>
      )}

    </HomeContainer>
  );
};

export default HomePage;
