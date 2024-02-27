import { Container, Typography } from '@mui/material';

const DataError = () => {
  return (
    <Container className="flex items-center justify-center mt-8">
      <Typography className="mt-4 font-bold text-black" variant="h4">Error loading data</Typography>
    </Container>
  );
};

export default DataError;
