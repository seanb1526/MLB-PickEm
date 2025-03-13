import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          MLB Pick'em
        </Typography>
        <Box>
          <Button color="inherit">Login</Button>
          <Button 
            color="inherit" 
            variant="outlined" 
            sx={{ ml: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
