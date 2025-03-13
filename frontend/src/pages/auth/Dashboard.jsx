import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Divider,
  Paper,
  CircularProgress,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  SportsMma as TrophyIcon,
  SportsCricket as CricketIcon,
  Notifications as NotificationsIcon,
  MonetizationOn as MoneyIcon,
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
  CalendarMonth as CalendarIcon,
  SportsSoccer as SportsIcon,
  AccountCircle as UserIcon,
  Logout as LogoutIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { supabase } from '../../config/supabaseClient';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tournaments, setTournaments] = useState([]);
  const [history, setHistory] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
        } else {
          setUser(session.user);
          // Fetch user profile info
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser(prev => ({ ...prev, ...profile }));
          }
          
          // Load tournaments
          await loadTournaments();
          await loadHistory();
        }
      } catch (error) {
        console.error('Session check error:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  const loadTournaments = async () => {
    // Simulated data - replace with actual API call
    const mockTournaments = [
      {
        id: 1,
        title: "MLB Daily Pick'em",
        description: "Select winners for all MLB games today",
        entryFee: 100,
        prizePool: 2500,
        participants: 42,
        endsAt: "Today at 7:00 PM",
        games: 15,
        status: "open",
        image: "https://images.unsplash.com/photo-1508344928928-7165b5b9fcf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 2,
        title: "Weekend Baseball Challenge",
        description: "Pick winners for weekend MLB games",
        entryFee: 200,
        prizePool: 5000,
        participants: 67,
        endsAt: "Sat at 1:00 PM",
        games: 30,
        status: "open",
        image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 3,
        title: "All-Star Pick'em Special",
        description: "Special tournament for All-Star games",
        entryFee: 500,
        prizePool: 10000,
        participants: 104,
        endsAt: "Jul 15 at 6:00 PM",
        games: 1,
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ];
    
    setTournaments(mockTournaments);
  };
  
  const loadHistory = async () => {
    // Simulated data - replace with actual API call
    const mockHistory = [
      { 
        id: 'hist-1', 
        date: '2023-06-12', 
        tournament: "MLB Daily Pick'em", 
        result: 'win', 
        earnings: 320,
        accuracy: 85 
      },
      { 
        id: 'hist-2', 
        date: '2023-06-10', 
        tournament: "Weekend Baseball Challenge", 
        result: 'loss', 
        earnings: 0,
        accuracy: 60 
      },
      { 
        id: 'hist-3', 
        date: '2023-06-08', 
        tournament: "MLB Daily Pick'em", 
        result: 'win', 
        earnings: 280,
        accuracy: 80 
      }
    ];
    
    setHistory(mockHistory);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleTournamentClick = (tournament) => {
    setSelectedTournament(tournament);
    setOpenDialog(true);
  };

  const handleEnterTournament = (id) => {
    setOpenDialog(false);
    navigate(`/tournament/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: '#f5f7fa', 
      minHeight: '100vh', 
      pb: 8 
    }}>
      {/* Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          backgroundColor: '#1976d2', 
          color: 'white', 
          borderRadius: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <TrophyIcon sx={{ mr: 1 }} /> PickWin
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" size="small">
                <NotificationsIcon />
              </IconButton>
              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: '#ffab00' }}>
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  {user?.email || 'User'}
                </Typography>
              </Box>
              <IconButton color="inherit" size="small" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* User Stats */}
        <Stack spacing={3} sx={{ mt: 3 }} direction={{ xs: 'column', md: 'row' }}>
          <Box sx={{ flex: 1 }}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>
                  <MoneyIcon />
                </Avatar>
                <Typography variant="h6">Your Balance</Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                ${user?.balance || '0.00'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Chip 
                  icon={<UpIcon fontSize="small" />} 
                  label="Add Funds" 
                  variant="outlined" 
                  color="primary"
                  onClick={() => navigate('/deposit')}
                  sx={{ mr: 1 }}
                />
                <Chip 
                  icon={<DownIcon fontSize="small" />} 
                  label="Withdraw" 
                  variant="outlined"
                  onClick={() => navigate('/withdraw')}
                />
              </Box>
            </Paper>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#ff9800', mr: 2 }}>
                  <SportsIcon />
                </Avatar>
                <Typography variant="h6">Your Stats</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Win Rate</Typography>
                <Typography variant="body1" fontWeight="bold">67%</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Tournaments Joined</Typography>
                <Typography variant="body1" fontWeight="bold">12</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Total Earnings</Typography>
                <Typography variant="body1" fontWeight="bold" color="#2e7d32">$1,240</Typography>
              </Box>
            </Paper>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#f44336', mr: 2 }}>
                  <CalendarIcon />
                </Avatar>
                <Typography variant="h6">Today's Events</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">MLB Games</Typography>
                <Typography variant="body1" fontWeight="bold">15</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Active Tournaments</Typography>
                <Typography variant="body1" fontWeight="bold">2</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">First Game</Typography>
                <Typography variant="body1" fontWeight="bold">7:05 PM ET</Typography>
              </Box>
            </Paper>
          </Box>
        </Stack>

        {/* Available Tournaments */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <CricketIcon sx={{ mr: 1 }} /> Available Tournaments
          </Typography>
          <Grid container spacing={3}>
            {tournaments.map((tournament) => (
              <Grid item xs={12} md={4} key={tournament.id}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    overflow: 'hidden', 
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }
                  }}
                  onClick={() => handleTournamentClick(tournament)}
                >
                  <Box sx={{ position: 'relative', height: 140 }}>
                    <Box
                      component="img"
                      src={tournament.image}
                      alt={tournament.title}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: 2
                      }}
                    >
                      <Typography variant="h6" color="white" fontWeight="bold">
                        {tournament.title}
                      </Typography>
                      <Typography variant="body2" color="white">
                        {tournament.endsAt}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {tournament.description}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Entry Fee</Typography>
                        <Typography variant="body1" fontWeight="bold">${tournament.entryFee}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Prize Pool</Typography>
                        <Typography variant="body1" fontWeight="bold" color="#2e7d32">${tournament.prizePool}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Participants</Typography>
                        <Typography variant="body1" fontWeight="bold">{tournament.participants}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Games</Typography>
                        <Typography variant="body1" fontWeight="bold">{tournament.games}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tournament Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedTournament?.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedTournament?.description}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Entry Fee</Typography>
                <Typography variant="body1" fontWeight="bold">${selectedTournament?.entryFee}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Prize Pool</Typography>
                <Typography variant="body1" fontWeight="bold" color="#2e7d32">${selectedTournament?.prizePool}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Participants</Typography>
                <Typography variant="body1" fontWeight="bold">{selectedTournament?.participants}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Ends At</Typography>
                <Typography variant="body1" fontWeight="bold">{selectedTournament?.endsAt}</Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
            <Button onClick={() => handleEnterTournament(selectedTournament?.id)} color="primary">Enter Tournament</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Dashboard;
