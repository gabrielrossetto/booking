import styled from 'styled-components';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)`
  background-color: #FFFFFF;
  box-shadow: none;
  box-shadow: rgb(0 0 0/8%) 0 1px 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <HeaderContent>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => navigate("/")}>
            Logo
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="profile">
            <AccountCircle />
          </IconButton>
        </HeaderContent>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
