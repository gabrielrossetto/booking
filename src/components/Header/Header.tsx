import { AppBar, Toolbar, Box, Container, Button, Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box className="text-white bg-primary">
      <AppBar position="static" color='transparent'>
        <Container>
          <Toolbar className="flex items-center justify-between w-full">
            <Box className="flex items-center justify-center">
              <Avatar onClick={() => navigate("/")} className="cursor-pointer" alt="Hostfully" src="https://play-lh.googleusercontent.com/laohj2nRBHB1oXnSJflEQIM_L8gHrNQjrQd31TpNpj0ZpAuHMLPPwNP-68W5sjfdteUr" />
              <Button
                onClick={() => navigate("/mybookings")}
                sx={{ color: 'white', ml: 5 }}
              >
                My Bookings
              </Button>
            </Box>
            <Avatar alt="Gabriel Rossetto" />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
