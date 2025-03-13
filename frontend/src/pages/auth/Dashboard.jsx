import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import { supabase } from '../../config/supabaseClient'; 

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    if (!session) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      setUser(session.user);
    }
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome, {user ? user.email : 'User'}!
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default Dashboard; 